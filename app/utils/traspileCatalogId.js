import invert from 'lodash/invert'
import omit from 'lodash/omit'

export const cyrillicMapping = {
  Ё: 'YO',
  Й: 'I',
  Ц: 'TS',
  У: 'U',
  К: 'K',
  Е: 'E',
  Н: 'N',
  Г: 'G',
  Ш: 'SH',
  Щ: 'SCH',
  З: 'Z',
  Х: 'H',
  Ъ: '',
  ё: 'yo',
  й: 'i',
  ц: 'ts',
  у: 'u',
  к: 'k',
  е: 'e',
  н: 'n',
  г: 'g',
  ш: 'sh',
  щ: 'sch',
  з: 'z',
  х: 'h',
  ъ: '',
  Ф: 'F',
  Ы: 'I',
  В: 'V',
  А: 'A',
  П: 'P',
  Р: 'R',
  О: 'O',
  Л: 'L',
  Д: 'D',
  Ж: 'ZH',
  Э: 'E',
  ф: 'f',
  ы: 'i',
  в: 'v',
  а: 'a',
  п: 'p',
  р: 'r',
  о: 'o',
  л: 'l',
  д: 'd',
  ж: 'zh',
  э: 'e',
  Я: 'Ya',
  Ч: 'CH',
  С: 'S',
  М: 'M',
  И: 'I',
  Т: 'T',
  Ь: '',
  Б: 'B',
  Ю: 'YU',
  я: 'ya',
  ч: 'ch',
  с: 's',
  м: 'm',
  и: 'i',
  т: 't',
  ь: '',
  б: 'b',
  ю: 'yu',
}

const transpile = (word, mapping = cyrillicMapping) => {
  if (!word || typeof word !== 'string') {
    return word
  }

  return word.split('')
    .map((char) => {
      return typeof mapping[char] === 'undefined' ? char : mapping[char]
    })
    .join('')
}

export function transpileCatalogId (word) {
  return transpile(word)
}

export function transpileCatalogIdBack (word) {
  return transpile(word, invert(omit(cyrillicMapping, ['Ъ', 'ъ', 'Ь', 'ь'])))
}
