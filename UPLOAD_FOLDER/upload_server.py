from flask import Flask, request, redirect, url_for
import os

app = Flask(__name__)

# Diretório onde os arquivos serão armazenados
UPLOAD_FOLDER = '/var/www/shxxtm/transcripts'  # Substitua pelo caminho do seu servidor onde quer armazenar os arquivos
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "No file part", 400
    file = request.files['file']
    if file.filename == '':
        return "No selected file", 400
    if file:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        return "File uploaded successfully", 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)  # Certifique-se de expor a porta que você configurou
