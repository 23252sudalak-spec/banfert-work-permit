import { FormSection } from '../types/permit';

export interface CreateFormResult {
  formId: string;
  responderUri: string;
  editUri: string;
  title: string;
}

/**
 * Google Forms API rejects newline characters in description and title fields,
 * which frequently triggers a 500 "Internal error" from Google's servers.
 * This helper strips newlines and control characters.
 */
function cleanText(text: string | undefined | null, maxLength = 250): string {
  if (!text) return '';
  return text
    .replace(/[\r\n]+/g, ' • ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

export async function createGoogleFormFromSections(
  sections: FormSection[],
  accessToken: string,
  customTitle?: string,
  onProgress?: (status: string, percentage: number) => void
): Promise<CreateFormResult> {
  const formTitle = cleanText(
    customTitle?.trim() ||
      'ใบอนุญาตปฏิบัติงานที่มีความเสี่ยง (Permit to Work - PTW)',
    120
  );

  onProgress?.('กำลังสร้างเอกสาร Google Form...', 15);

  // 1. Create the initial blank form
  const createResponse = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      info: {
        title: formTitle,
      },
    }),
  });

  if (!createResponse.ok) {
    const errorData = await createResponse.json().catch(() => ({}));
    console.error('Google Forms Create Error:', errorData);
    const message =
      errorData?.error?.message ||
      `สร้าง Google Form ไม่สำเร็จ (HTTP ${createResponse.status})`;
    throw new Error(message);
  }

  const createdFormData = await createResponse.json();
  const formId = createdFormData.formId;
  const responderUri =
    createdFormData.responderUri ||
    `https://docs.google.com/forms/d/e/${formId}/viewform`;
  const editUri = `https://docs.google.com/forms/d/${formId}/edit`;

  onProgress?.('สร้างเอกสารสำเร็จ กำลังจัดเตรียมโครงสร้างคำถาม...', 30);

  // 2. Update Form Description (single-line without raw newlines)
  try {
    const desc = cleanText(
      'ระบบใบอนุญาตปฏิบัติงานที่มีความเสี่ยง (Permit to Work System - PTW) ' +
      'ตามมาตรฐาน จป.วิชาชีพ และ พ.ร.บ.ความปลอดภัย อาชีวอนามัย และสภาพแวดล้อมในการทำงาน พ.ศ. 2554'
    );

    await fetch(
      `https://forms.googleapis.com/v1/forms/${encodeURIComponent(formId)}:batchUpdate`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [
            {
              updateFormInfo: {
                info: { description: desc },
                updateMask: 'description',
              },
            },
          ],
        }),
      }
    );
  } catch (err) {
    console.warn('Could not update form description, continuing with questions...', err);
  }

  // 3. Build items by section and send in smaller batches to avoid Google 500 "Internal error"
  let currentItemIndex = 0;

  for (let sIdx = 0; sIdx < sections.length; sIdx++) {
    const section = sections[sIdx];
    const sectionProgress = 35 + Math.round(((sIdx + 1) / sections.length) * 55);
    onProgress?.(`กำลังบันทึกส่วนที่ ${section.sectionNumber}: ${cleanText(section.title, 40)}...`, sectionProgress);

    const sectionRequests: any[] = [];

    // Add PageBreak for Section 2, 3, 4
    if (sIdx > 0) {
      sectionRequests.push({
        createItem: {
          item: {
            title: cleanText(section.title, 120),
            pageBreakItem: {},
          },
          location: { index: currentItemIndex },
        },
      });
      currentItemIndex++;
    }

    // Add questions for this section
    for (const q of section.questions) {
      const qDescParts = [
        q.description ? cleanText(q.description, 150) : '',
        q.legalReference ? `[⚖️ ${cleanText(q.legalReference, 60)}]` : '',
        q.safetyOfficerTip ? `[💡 ${cleanText(q.safetyOfficerTip, 100)}]` : '',
      ].filter(Boolean);

      const description = qDescParts.join(' • ');

      const itemPayload: any = {
        title: cleanText(q.title, 180),
      };

      if (description) {
        itemPayload.description = description;
      }

      if (q.type === 'SHORT_ANSWER') {
        itemPayload.questionItem = {
          question: {
            required: !!q.required,
            textQuestion: { paragraph: false },
          },
        };
      } else if (q.type === 'PARAGRAPH') {
        itemPayload.questionItem = {
          question: {
            required: !!q.required,
            textQuestion: { paragraph: true },
          },
        };
      } else if (q.type === 'MULTIPLE_CHOICE') {
        itemPayload.questionItem = {
          question: {
            required: !!q.required,
            choiceQuestion: {
              type: 'RADIO',
              options: (q.options || ['ใช่', 'ไม่ใช่']).map((opt) => ({
                value: cleanText(opt, 120),
              })),
            },
          },
        };
      } else if (q.type === 'CHECKBOXES') {
        itemPayload.questionItem = {
          question: {
            required: !!q.required,
            choiceQuestion: {
              type: 'CHECKBOX',
              options: (q.options || ['ยืนยัน']).map((opt) => ({
                value: cleanText(opt, 120),
              })),
            },
          },
        };
      } else if (q.type === 'DROPDOWN') {
        itemPayload.questionItem = {
          question: {
            required: !!q.required,
            choiceQuestion: {
              type: 'DROP_DOWN',
              options: (q.options || ['ตัวเลือก 1']).map((opt) => ({
                value: cleanText(opt, 120),
              })),
            },
          },
        };
      } else if (q.type === 'DATE') {
        itemPayload.questionItem = {
          question: {
            required: !!q.required,
            dateQuestion: {
              includeTime: false,
              includeYear: true,
            },
          },
        };
      } else if (q.type === 'TIME') {
        itemPayload.questionItem = {
          question: {
            required: !!q.required,
            timeQuestion: {
              duration: false,
            },
          },
        };
      } else {
        // Fallback: Text question
        itemPayload.questionItem = {
          question: {
            required: !!q.required,
            textQuestion: { paragraph: false },
          },
        };
      }

      sectionRequests.push({
        createItem: {
          item: itemPayload,
          location: { index: currentItemIndex },
        },
      });
      currentItemIndex++;
    }

    // Execute this section's batch update
    if (sectionRequests.length > 0) {
      const batchRes = await fetch(
        `https://forms.googleapis.com/v1/forms/${encodeURIComponent(formId)}:batchUpdate`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ requests: sectionRequests }),
        }
      );

      if (!batchRes.ok) {
        const errorData = await batchRes.json().catch(() => ({}));
        console.error(`Google Forms batchUpdate error in section ${section.sectionNumber}:`, errorData);
        
        // If batch update failed, attempt safe fallback: insert as text questions
        console.warn('Attempting simplified fallback for section', section.sectionNumber);
        const fallbackRequests = sectionRequests.map((req) => {
          if (req.createItem?.item?.questionItem) {
            return {
              createItem: {
                item: {
                  title: req.createItem.item.title,
                  questionItem: {
                    question: {
                      required: req.createItem.item.questionItem.question.required,
                      textQuestion: { paragraph: false },
                    },
                  },
                },
                location: req.createItem.location,
              },
            };
          }
          return req;
        });

        const fallbackRes = await fetch(
          `https://forms.googleapis.com/v1/forms/${encodeURIComponent(formId)}:batchUpdate`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ requests: fallbackRequests }),
          }
        );

        if (!fallbackRes.ok) {
          const fallbackError = await fallbackRes.json().catch(() => ({}));
          const errMsg =
            fallbackError?.error?.message ||
            errorData?.error?.message ||
            `เกิดข้อผิดพลาดในการบันทึกคำถามส่วนที่ ${section.sectionNumber} (HTTP ${batchRes.status})`;
          throw new Error(errMsg);
        }
      }
    }
  }

  onProgress?.('สร้างเสร็จสมบูรณ์ 100%! พร้อมเปิดใช้งาน', 100);

  return {
    formId,
    responderUri,
    editUri,
    title: formTitle,
  };
}
