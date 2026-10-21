import { FormSection } from '../types/permit';

export function generateGoogleAppsScript(sections: FormSection[]): string {
  let script = `/**
 * สคริปต์สร้าง Google Form ใบอนุญาตทำงานเสี่ยง (Permit to Work - PTW)
 * ออกแบบตามมาตรฐานเจ้าหน้าที่ความปลอดภัยในการทำงานระดับวิชาชีพ (จป.วิชาชีพ)
 * 
 * วิธีใช้งาน:
 * 1. ไปที่ https://script.google.com
 * 2. คลิก "New project" (โครงการใหม่)
 * 3. วางโค้ดนี้ทั้งหมดลงในช่อง editor
 * 4. กดปุ่ม "Run" (เรียกใช้) ด้านบน
 * 5. อนุญาตสิทธิ์การเข้าถึง (Authorization) เพียงครั้งเดียว
 * 6. ระบบจะสร้าง Google Form และพิมพ์ URL สำหรับแก้ไขและส่งให้ผู้รับเหมาใน Execution Log ทันที!
 */

function createPermitToWorkForm() {
  var formTitle = "ใบอนุญาตปฏิบัติงานที่มีความเสี่ยง (Permit to Work - PTW) [มาตรฐาน จป.วิชาชีพ]";
  var form = FormApp.create(formTitle);
  
  form.setDescription(
    "ระบบใบอนุญาตปฏิบัติงานที่มีความเสี่ยง (Permit to Work System - PTW)\\n" +
    "จัดทำขึ้นตามมาตรฐาน จป.วิชาชีพ และสอดคล้องกับ พ.ร.บ.ความปลอดภัย อาชีวอนามัย และสภาพแวดล้อมในการทำงาน พ.ศ. 2554\\n" +
    "⚠️ คำเตือน: ผู้รับเหมาและพนักงานทุกคนต้องผ่านการตรวจสอบมาตรการความปลอดภัยและได้รับการอนุมัติก่อนเริ่มงานโดยเด็ดขาด"
  );
  
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setCollectEmail(true);

`;

  sections.forEach((section, sIdx) => {
    if (sIdx > 0) {
      script += `  // ==========================================
  // ${section.title}
  // ==========================================
  var page${sIdx + 1} = form.addPageBreakItem();
  page${sIdx + 1}.setTitle(${JSON.stringify(section.title)});
  page${sIdx + 1}.setHelpText(${JSON.stringify(section.description)});

`;
    }

    section.questions.forEach((q, qIdx) => {
      const helpText = [
        q.description || '',
        q.legalReference ? `⚖️ อ้างอิง: ${q.legalReference}` : '',
        q.safetyOfficerTip ? `💡 คำแนะนำ จป.: ${q.safetyOfficerTip}` : '',
      ]
        .filter(Boolean)
        .join('\n');

      const varName = `q_${sIdx + 1}_${qIdx + 1}`;

      if (q.type === 'SHORT_ANSWER') {
        script += `  var ${varName} = form.addTextItem();
  ${varName}.setTitle(${JSON.stringify(q.title)});
  ${varName}.setHelpText(${JSON.stringify(helpText)});
  ${varName}.setRequired(${q.required});

`;
      } else if (q.type === 'PARAGRAPH') {
        script += `  var ${varName} = form.addParagraphTextItem();
  ${varName}.setTitle(${JSON.stringify(q.title)});
  ${varName}.setHelpText(${JSON.stringify(helpText)});
  ${varName}.setRequired(${q.required});

`;
      } else if (q.type === 'MULTIPLE_CHOICE') {
        const choices = (q.options || ['ใช่', 'ไม่ใช่'])
          .map((opt) => `${varName}.createChoice(${JSON.stringify(opt)})`)
          .join(', ');
        script += `  var ${varName} = form.addMultipleChoiceItem();
  ${varName}.setTitle(${JSON.stringify(q.title)});
  ${varName}.setHelpText(${JSON.stringify(helpText)});
  ${varName}.setChoices([${choices}]);
  ${varName}.setRequired(${q.required});

`;
      } else if (q.type === 'CHECKBOXES') {
        const choices = (q.options || ['รับทราบ'])
          .map((opt) => `${varName}.createChoice(${JSON.stringify(opt)})`)
          .join(', ');
        script += `  var ${varName} = form.addCheckboxItem();
  ${varName}.setTitle(${JSON.stringify(q.title)});
  ${varName}.setHelpText(${JSON.stringify(helpText)});
  ${varName}.setChoices([${choices}]);
  ${varName}.setRequired(${q.required});

`;
      } else if (q.type === 'DATE') {
        script += `  var ${varName} = form.addDateItem();
  ${varName}.setTitle(${JSON.stringify(q.title)});
  ${varName}.setHelpText(${JSON.stringify(helpText)});
  ${varName}.setRequired(${q.required});

`;
      } else if (q.type === 'TIME') {
        script += `  var ${varName} = form.addTimeItem();
  ${varName}.setTitle(${JSON.stringify(q.title)});
  ${varName}.setHelpText(${JSON.stringify(helpText)});
  ${varName}.setRequired(${q.required});

`;
      } else {
        // Text item or file upload link
        script += `  var ${varName} = form.addTextItem();
  ${varName}.setTitle(${JSON.stringify(q.title)});
  ${varName}.setHelpText(${JSON.stringify(helpText)});
  ${varName}.setRequired(${q.required});

`;
      }
    });
  });

  script += `  // พิมพ์ URL ในบันทึกของ Apps Script
  Logger.log("✅ สร้าง Google Form เรียบร้อยแล้ว!");
  Logger.log("🔗 ลิงก์สำหรับแก้ไขฟอร์ม (Edit URL): " + form.getEditUrl());
  Logger.log("📋 ลิงก์สำหรับส่งให้ผู้รับเหมากรอก (Published URL): " + form.getPublishedUrl());
}
`;

  return script;
}
