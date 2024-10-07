from flask import Flask, request, jsonify

app = Flask(__name__)

# Simulamos una API de IA para clasificar el ticket
def classify_ticket(description):
    if "software" in description.lower():
        category = "Software"
        suggestion = "Reinicia la aplicación e intenta nuevamente."
    elif "hardware" in description.lower():
        category = "Hardware"
        suggestion = "Verifica las conexiones físicas del equipo."
    else:
        category = "General"
        suggestion = "Un agente revisará tu solicitud pronto."

    return category, suggestion

@app.route('/classify-ticket', methods=['POST'])
def classify():
    data = request.get_json()
    description = data['description']
    priority = data['priority']
    
    category, suggestion = classify_ticket(description)

    return jsonify({
        'category': category,
        'priority': priority,
        'suggestion': suggestion
    })

if __name__ == '__main__':
    app.run(debug=True)
