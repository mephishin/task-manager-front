import { Duration } from 'luxon';

// Интерфейс для представления части интервала
interface IntervalPart {
    unit: string;
    value: number;
}

// Локализация временных промежутков на русский язык
function localizeInterval(parts: IntervalPart[]) {
    const localizedParts = parts.map(part => {
        switch (part.unit) {
            case 'years':
                return `${part.value} ${pluralize(part.value, ['год', 'года', 'лет'])}`;
            case 'months':
                return `${part.value} ${pluralize(part.value, ['месяц', 'месяца', 'месяцев'])}`;
            case 'weeks':
                return `${part.value} ${pluralize(part.value, ['неделя', 'недели', 'недель'])}`;
            case 'days':
                return `${part.value} ${pluralize(part.value, ['день', 'дня', 'дней'])}`;
            case 'hours':
                return `${part.value} ${pluralize(part.value, ['час', 'часа', 'часов'])}`;
            case 'minutes':
                return `${part.value} ${pluralize(part.value, ['минута', 'минуты', 'минут'])}`;
            case 'seconds':
                return `${part.value} ${pluralize(part.value, ['секунда', 'секунды', 'секунд'])}`;
            default:
                return `${part.value} ${part.unit}`;
        }
    });
    return localizedParts.filter(Boolean).join(', '); // удаляем пустые элементы и объединяем список
}

// Вспомогательная функция для склонения существительных
function pluralize(value: number, forms: string[]) {
    value = Math.abs(value) % 100;
    const num = value % 10;
    if ((value >= 11 && value <= 19)) return forms[2];
    else if (num === 1) return forms[0]; // единственное число
    else if ([2, 3, 4].includes(num)) return forms[1]; // родительный падеж множ. ч.
    else return forms[2]; // прочие случаи
}

// Основная функция для преобразования строки ISO-8601 в понятный человеку формат
export function formatISORus(str: string): string | null {
    try {
        const dur = Duration.fromISO(str);
        const interval = dur.shiftTo('days', 'hours', 'minutes').normalize().toObject();
        const parts: IntervalPart[] = Object.entries(interval)
            .filter(([, val]: [string, unknown]) => typeof val === 'number' && val !== 0)
            .map(([unit, value]: [string, number]) => ({
                unit,
                value: Math.round(value), // Приводим значение к числу
            }));
        return localizeInterval(parts);
    } catch (err) {
        console.error((err as Error).message);
        return null;
    }
}