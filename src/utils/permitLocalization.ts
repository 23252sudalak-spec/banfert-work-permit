import { FormSection, Language, FormQuestion } from '../types/permit';
import { formatBilingualText } from '../data/translations';

export function getLocalizedSections(
  rawSections: FormSection[],
  lang: Language
): FormSection[] {
  if (lang === 'th') {
    return rawSections;
  }

  return rawSections.map((sec) => {
    const localizedSecTitle = formatBilingualText(
      sec.title,
      sec.titleZh,
      sec.titleMy,
      lang
    );
    const localizedSecDesc = formatBilingualText(
      sec.description,
      sec.descriptionZh,
      sec.descriptionMy,
      lang
    );

    const localizedQuestions: FormQuestion[] = sec.questions.map((q) => {
      const title = formatBilingualText(q.title, q.titleZh, q.titleMy, lang);
      const description = q.description
        ? formatBilingualText(q.description, q.descriptionZh, q.descriptionMy, lang)
        : undefined;

      const safetyOfficerTip = q.safetyOfficerTip
        ? formatBilingualText(
            q.safetyOfficerTip,
            q.safetyOfficerTipZh,
            q.safetyOfficerTipMy,
            lang
          )
        : undefined;

      const googleFormEquivalent = formatBilingualText(
        q.googleFormEquivalent,
        q.googleFormEquivalentZh,
        q.googleFormEquivalentMy,
        lang
      );

      let options = q.options;
      if (q.options) {
        options = q.options.map((opt, oIdx) => {
          const optZh = q.optionsZh && q.optionsZh[oIdx] ? q.optionsZh[oIdx] : opt;
          const optMy = q.optionsMy && q.optionsMy[oIdx] ? q.optionsMy[oIdx] : opt;
          return formatBilingualText(opt, optZh, optMy, lang);
        });
      }

      return {
        ...q,
        title,
        description,
        safetyOfficerTip,
        googleFormEquivalent,
        options,
      };
    });

    return {
      ...sec,
      title: localizedSecTitle,
      description: localizedSecDesc,
      questions: localizedQuestions,
    };
  });
}
