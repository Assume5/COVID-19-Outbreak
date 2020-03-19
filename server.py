import bottle
import data


@bottle.route("/")
def setHTML():
    return bottle.static_file("index.html", root="")
    
    
@bottle.route("/code.js")
def setMAP():
    return bottle.static_file("code.js", root="")
    
    
@bottle.route("/data")
def get_data():
    return (data.get_data("https://coronavirus-19-api.herokuapp.com/countries"))
    
    
bottle.run(host="0.0.0.0", port=8080, debug=True)