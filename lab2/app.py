from flask import Flask, request, render_template
import re


app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/display', methods=['GET', 'POST'])
def display():
    if request.method == 'POST':
        url_params = request.args
        headers = request.headers
        cookies = request.cookies
        form_data = request.form
        return render_template('display.html', url_params=url_params, headers=headers, cookies=cookies, form_data=form_data)
    else:
        return "Используйте метод POST"
    
@app.route('/phone_form')
def phone_form():
    return render_template('phone_form.html')


@app.route('/validate_phone', methods=['POST'])
def validate_phone():
    phone = request.form.get('phone', '').strip()
    error_class = ''
    error_message = ''
    formatted_phone = ''

    if not re.match(r'^(?:\+7|8)?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}$', phone):
        if len(phone) not in [10, 11] or not phone.replace(' ', '').replace('-', '').replace('.', '').replace('(', '').replace(')', '').isdigit():
            error_class = 'is-invalid'
            error_message = "Недопустимый ввод. Неверное количество цифр"
        else:
            error_class = 'is-invalid'
            error_message = "Недопустимый ввод. В номере телефона содержаться недопустимые символы."
    else:
        formatted_phone = re.sub(r'^(?:\+7|8)?\s?\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{2})[\s.-]?(\d{2})$', r'8-\1-\2-\3-\4', phone)

    return render_template('phone_form.html', phone_error_class=error_class, phone_error_message=error_message, phone_value=phone, formatted_phone=formatted_phone)

if __name__ == '__main__':
    app.run(debug=True)