import { FormSection } from '../types/permit';

export interface CreateFormResult {
  formId: string;
  responderUri: string;
  editUri: string;
  title: string;
}

export async function createGoogleFormFromSections(
  sections: FormSection[],
  accessToken: string,
  customTitle?: string,
  onProgress?: (status: string, percentage: number) => void
): Promise<CreateFormResult> {
  const formTitle =
    customTitle?.trim() ||
    'ใบอนุญาตปฏิบัติงานที่มีความเสี่ยง (Permit to Work - PTW) [มาตรฐาน จป.วิชาชีพ]';

  onProgress?.('กำลังเริ่มสร้างไฟล์ Google Form ใหม่...', 10);

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
        documentTitle: formTitle,
      },
    }),
  });

  if (!createResponse.ok) {
    const errorData = await createResponse.json().catch(() => ({}));
    const message =
      errorData?.error?.message ||
      `สร้าง Google Form ไม่สำเร็จ (HTTP ${createResponse.status})`;
    throw new Error(message);
  }

  const createdFormData = await createResponse.json();
  const formId = createdFormData.formId;
  const responderUri = createdFormData.responderUri || `https://docs.google.com/forms/d/e/${formId}/viewform`;
  const editUri = `https://docs.google.com/forms/d/${formId}/edit`;

  onProgress?.('สร้างเอกสารสำเร็จ กำลังจัดเตรียมโครงสร้างคำถามและหมวดหมู่...', 30);

  // 2. Build the batchUpdate requests
  const requests: any[] = [];

  // Update overall form description
  requests.push({
    updateFormInfo: {
      info: {
        description:
          'ระบบใบอนุญาตปฏิบัติงานที่มีความเสี่ยง (Permit to Work System - PTW)\n' +
          'จัดทำขึ้นตามมาตรฐานเจ้าหน้าที่ความปลอดภัยในการทำงาน (จป.วิชาชีพ) และสอดคล้องกับ พ.ร.บ.ความปลอดภัย อาชีวอนามัย และสภาพแวดล้อมในการทำงาน พ.ศ. 2554\n' +
          '⚠️ คำเตือน: ผู้รับเหมาหรือพนักงานทุกคนต้องได้รับการอนุมัติใบอนุญาตนี้ก่อนเริ่มปฏิบัติงานเสี่ยงโดยเด็ดขาด',
      },
      updateMask: 'description',
    },
  });

  let itemIndex = 0;

  for (let sIdx = 0; sIdx < sections.length; sIdx++) {
    const section = sections[sIdx];

    // If section > 0, create a pageBreakItem (Google Forms Section)
    if (sIdx > 0) {
      requests.push({
        createItem: {
          item: {
            title: section.title,
            description: section.description,
            pageBreakItem: {},
          },
          location: { index: itemIndex },
        },
      });
      itemIndex++;
    }

    // Add each question in this section
    for (const q of section.questions) {
      const itemPayload: any = {
        title: q.title,
        description: [
          q.description || '',
          q.legalReference ? `⚖️ อ้างอิงมาตรฐาน: ${q.legalReference}` : '',
          q.safetyOfficerTip ? `💡 ข้อแนะนำ จป.วิชาชีพ: ${q.safetyOfficerTip}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
      };

      if (q.type === 'SHORT_ANSWER') {
        itemPayload.questionItem = {
          question: {
            required: q.required,
            textQuestion: { paragraph: false },
          },
        };
      } else if (q.type === 'PARAGRAPH') {
        itemPayload.questionItem = {
          question: {
            required: q.required,
            textQuestion: { paragraph: true },
          },
        };
      } else if (q.type === 'MULTIPLE_CHOICE') {
        itemPayload.questionItem = {
          question: {
            required: q.required,
            choiceQuestion: {
              type: 'RADIO',
              options: (q.options || ['ใช่', 'ไม่ใช่']).map((opt) => ({
                value: opt,
              })),
            },
          },
        };
      } else if (q.type === 'CHECKBOXES') {
        itemPayload.questionItem = {
          question: {
            required: q.required,
            choiceQuestion: {
              type: 'CHECKBOX',
              options: (q.options || ['ยืนยัน']).map((opt) => ({
                value: opt,
              })),
            },
          },
        };
      } else if (q.type === 'DROPDOWN') {
        itemPayload.questionItem = {
          question: {
            required: q.required,
            choiceQuestion: {
              type: 'DROP_DOWN',
              options: (q.options || ['ตัวเลือก 1']).map((opt) => ({
                value: opt,
              })),
            },
          },
        };
      } else if (q.type === 'DATE') {
        itemPayload.questionItem = {
          question: {
            required: q.required,
            dateQuestion: {
              includeTime: false,
              includeYear: true,
            },
          },
        };
      } else if (q.type === 'TIME') {
        itemPayload.questionItem = {
          question: {
            required: q.required,
            timeQuestion: {},
          },
        };
      } else {
        // Fallback for file upload or custom types (via short answer text link for Drive upload)
        itemPayload.questionItem = {
          question: {
            required: q.required,
            textQuestion: { paragraph: false },
          },
        };
      }

      requests.push({
        createItem: {
          item: itemPayload,
          location: { index: itemIndex },
        },
      });
      itemIndex++;
    }
  }

  onProgress?.('กำลังอัปเดตคำถามและมาตรการความปลอดภัยทั้งหมดลงแบบฟอร์ม...', 65);

  const batchResponse = await fetch(
    `https://forms.googleapis.com/v1/forms/${encodeURIComponent(formId)}:batchUpdate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    }
  );

  if (!batchResponse.ok) {
    const errorData = await batchResponse.json().catch(() => ({}));
    const message =
      errorData?.error?.message ||
      `เกิดข้อผิดพลาดในการบันทึกคำถาม (HTTP ${batchResponse.status})`;
    throw new Error(message);
  }

  onProgress?.('สร้างเสร็จสมบูรณ์ 100%! พร้อมเปิดใช้งาน', 100);

  return {
    formId,
    responderUri,
    editUri,
    title: formTitle,
  };
}
