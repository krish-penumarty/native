/*
		Javascript Library

		Core

*/

/*
  Func: Render
	Param: html, node
	Return: update dom
*/
export function Render(html, node) {
  node.innerHTML = html;
};


/*
  Func: Insert
	Param: url to css
	Return: insert css into head
*/
export function Insert(css) {
  let head = document.getElementsByTagName('HEAD')[0];  

  let link = document.createElement('link'); 
  link.rel = 'stylesheet';  
  link.type = 'text/css'; 
  link.href = css;  

  head.appendChild(link); 
};

/*
  Func: Script
  Param: url to script
  Return: insert script into head
*/
export function Script(script) {
  let head = document.getElementsByTagName('HEAD')[0];  

  let link = document.createElement('script'); 
  link.type = 'text/javascript'; 
  link.src = script;  

  head.appendChild(link); 
};


/*
  Func: Title
  Param: title text
  Return: insert title into head
*/
export function Title(title) {
  window.document.title = title;
};


/*
  Func: Meta
  Param: name, content
  Return: insert meta content
*/
export function Meta(name, content) {
  let head = document.getElementsByTagName('HEAD')[0];  

  let meta = document.createElement('meta'); 
  meta.name = name;  
  meta.content = content; 

  head.appendChild(meta); 
};


/*
  Func: loadDoc
	Param: url to file
	Return: return string of file
*/
export function loadDoc(url) { 
  return new Promise(function (resolve, reject) {
    
    let xhr = new XMLHttpRequest();

    // Setup our listener to process compeleted requests
    xhr.onreadystatechange = function () {
      // Only run if the request is complete
      if (xhr.readyState !== 4) return;

      // Process our return data
      // status = 0 for local files
      if ((xhr.status == 0 || xhr.status >= 200) && xhr.status < 300) {
        resolve(xhr.responseText)

      // Request Fails
      } else {
        reject({
            status: this.status,
            statusText: xhr.statusText
        });
      }
    };
    
    xhr.onerror = function () {
        reject({
            status: this.status,
            statusText: xhr.statusText
        });
    };

    xhr.open("GET", url, true);
    xhr.send();

  });
}


/*
  Func: Location
  Param: 
  Return: requested perma link
*/
export function Location() {
  let location, w = window.location;

  // Search Query: Local
  function checkPage() {
    if(!w.search) return;

    let q = w.search.substring(1);
    let p = new URLSearchParams(q);
    return p.get("page");
  }

  // Direct URL: Live
  function checkURL() {
    let u = w.pathname;
    u = u.substring(u.lastIndexOf('/') + 1);
    if(u.indexOf('.') !== -1) { u = u.slice(0, u.indexOf('.')); }

    if(u.toLowerCase() === 'index') { location = checkPage(); }
    else { location = u; }

    if(location) return location.toLowerCase();

    return;
  }


  return checkURL();
};


/*
  Func: Text
  Param: path
  Return: text
*/
export async function Text(path) {
  let text, file = './content/' + window.app.lang + '/web/' + path + '.json';
  text = await loadDoc(file);
  text = JSON.parse(text);

  return text;
};



