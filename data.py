import urllib.request
import urllib
import json
def get_data(url):
    response = urllib.request.urlopen(url)
    content = response.read().decode()
    jsonData = json.loads(content)
    dict={}
    for i in jsonData:
        if(i["cases"]>1000):
            dict[str(i["country"])]={
                "cases":int(i["cases"]),
                "todayCases":int(i["todayCases"]),
                "deaths": int(i["deaths"]),
                "todayDeaths":int(i["todayDeaths"]),
                "recovered":int(i["recovered"])
            }
    print(dict)
    return json.dumps(dict)
print((get_data("https://coronavirus-19-api.herokuapp.com/countries")))
