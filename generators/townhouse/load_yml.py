import urllib

url = 'https://www.dropbox.com/scl/fi/3gcnz87hkukkvlkdcgjz5/data.yml?rlkey=03yuz98j3vo8powai6nuv0mf6&dl=1'

response = urllib.urlopen(url)
    

print(response.read())