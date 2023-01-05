from flask import Flask, render_template,flash, request, redirect,url_for
from werkzeug.utils import secure_filename
import os
from main import infer_by_web

ALLOWED_EXTENSIONS = set(['png', 'jpg','jpeg'])
UPLOAD_FOLDER = 'static/uploads/'
app = Flask(__name__)
app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def hello():

    return render_template('index.html')


@app.route('/about/')
def about():
    return render_template('about.html')

@app.route('/textrecognition/')
def textrecognition():
    return render_template('word_recognition.html')

@app.route('/upload/', methods=['POST'])
def upload_image():
	print('1')
	if 'file' not in request.files:
		flash('No file part')
		return redirect(request.url)
	file = request.files['file']
	if file.filename == '':
		flash('No image selected for uploading')
		return redirect(request.url)
	if file and allowed_file(file.filename):
		filename = secure_filename(file.filename)
		file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
		#print('upload_image filename: ' + filename)

		flash('Image successfully uploaded and displayed below')
		print('I am in app')
		rec = infer_by_web('uploads/' + filename,"bestPath")
		print('recognized in app',rec)
		return render_template('word_recognition.html', filename=filename,recognized = rec)
	else:
		flash('Allowed image types are -> png, jpg')
		return redirect(request.url)

@app.route('/display/<filename>')
def display_image(filename):
	print('2')
	#print('display_image filename: ' + filename)
	rec = infer_by_web('uploads/' + filename,"bestPath")
	print(rec)
	return redirect(url_for('static', filename='uploads/' + filename), code=301)


