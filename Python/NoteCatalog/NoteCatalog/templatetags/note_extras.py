from django import template
import re

register = template.Library()


@register.filter
def readtime(text):
    """
    Оценивает время чтения текста на основе количества слов.
    Предполагается, что средняя скорость чтения составляет 200 слов в минуту.
    """
    if not text:
        return "~0 мин"
    
    # Удаляем HTML теги и считаем слова
    clean_text = re.sub(r'<[^>]+>', '', str(text))
    words = len(clean_text.split())
    
    # Средняя скорость чтения: 200 слов в минуту
    minutes = words / 200
    
    if minutes < 1:
        return "~1 мин"
    elif minutes < 2:
        return f"~{int(minutes)} мин"
    else:
        return f"~{int(minutes)} мин"


@register.filter
def highlight_search(text, query):
    """
    Подсвечивает найденные слова в тексте.
    """
    if not query or not text:
        return text
    
    # Экранируем специальные символы в запросе
    escaped_query = re.escape(query)
    
    # Заменяем найденные слова на подсвеченные
    highlighted = re.sub(
        f'({escaped_query})',
        r'<mark>\1</mark>',
        str(text),
        flags=re.IGNORECASE
    )
    
    return highlighted
