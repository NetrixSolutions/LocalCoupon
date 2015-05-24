import webapp2
import urllib
from google.appengine.api import urlfetch

basicAuth = "Bearer "


def IsNotNull(value):
    return value is not None and len(value) > 0


class MainPage(webapp2.RequestHandler):
    def get(self):
        url = self.request.get('url')
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write(url)


class APIWrapper(webapp2.RequestHandler):
    def get(self):
        url = self.request.get('url')
        postbody = self.request.get('post')
        accessToken = self.request.get('accessToken')

        if accessToken is None:
            accessToken = ""

        deletebody = self.request.get('delete')
        if IsNotNull(url):
            if IsNotNull(postbody):
                postbody = postbody.replace("_AND_", "&")
                postbody = postbody.replace("_?_", "?")
                if accessToken != "":
                    headersC={"Authorization" : "Basic "+accessToken, "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}
                else:
                    headersC={}

                result = urlfetch.fetch(url, payload=postbody, method=urlfetch.POST, headers = headersC)
            elif IsNotNull(deletebody):
                result = urlfetch.fetch(url, payload=deletebody, method=urlfetch.DELETE,
                                        headers={"Authorization": basicAuth, "Content-Type": "application/json"})
            else:
                result = urlfetch.fetch(url, headers={"Authorization": basicAuth + accessToken})
            if result.status_code == 200:
                self.response.headers.add_header("Access-Control-Allow-Origin", "*")
                self.response.headers['Content-Type'] = 'application/json'
                self.response.write(result.content)
            else:
                self.response.headers.add_header("Access-Control-Allow-Origin", "*")
                self.response.headers['Content-Type'] = 'text/plain'
                self.response.write(str(result.status_code) + result.content)
        else:
            self.response.headers.add_header("Access-Control-Allow-Origin", "*")
            self.response.headers['Content-Type'] = 'text/plain'
            self.response.write("You need to add an url parameter")


application = webapp2.WSGIApplication([
                                          ('/', APIWrapper),
                                      ], debug=True)
