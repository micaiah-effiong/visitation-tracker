let resultList = document.getElementById("resultList");

function formRequest(fromName, trigger = "onsubmit") {
	console.log(document[fromName]);
	document[fromName][trigger] = (evt) => {
		evt.preventDefault();
		let target;

		if (evt.target.form) {
			target = evt.target.form;
		} else {
			target = evt.target;
		}

		let elts = [...target.elements];
		let reqBody = {};
		elts.forEach((elt) => {
			if (elt.name) {
				reqBody[elt.name] = elt.value;
			}
		});

		if (target.method.toUpperCase() == "GET") {
			fetch(target.action + "&" + JSONToURLEncoded(reqBody))
				.then((res) => res.json())
				.then((res) => {
					console.log(res);
					return res.data.map((el) => `<li>${el.email}</li>`);
				})
				.then((res) => (resultList.innerHTML = res))
				.catch(console.log);
		} else if (target.method.toUpperCase() == "POST") {
			reqBody = JSON.stringify(reqBody);
			fetch(target.action, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: reqBody,
			})
				.then((res) => res.json())
				.then((res) => {
					console.log(res);
					return res;
				})
				.catch(console.log);
		}
	};
}
formRequest("search", "oninput");
let visitRes = formRequest("visit");
// visitRes =

function JSONToURLEncoded(obj) {
	return Object.entries(obj)
		.map(([key, val]) => {
			return `${key}=${val}`;
		})
		.join("&");
}

function addToField(evt, id) {
	let { target } = evt;
	let newTarget = document.getElementById(id);
	newTarget.value = target.innerText;
}
