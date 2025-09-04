import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

interface DataItem {
	id: number;
	Date: Date;
	Name: string;
	Phone: "admin" | "user";
	Number: number;
}
const app = document.getElementById("app");

const templateTable: any = document.getElementById("tableeee");

async function init() {
	const res = await fetch("https://api-generator.retool.com/Ft4671/data");
	const jsonData = (await res.json()) as DataItem[];
	const clone = templateTable.content.cloneNode(true);

	for (const e of jsonData) {
		let tr = document.createElement("tr");
		let td1 = document.createElement("td");
		let td2 = document.createElement("td");
		let td3 = document.createElement("td");
		let td4 = document.createElement("td");
		let td5 = document.createElement("td");
		let td6 = document.createElement("td");
		let action = document.createElement("button");
		action.className = "btn btn-primary";
		action.textContent = "Delete";
		td6.appendChild(action);
		td1.textContent = `${e.id}`;
		td2.textContent = `${e.Name}`;
		td3.textContent = `${e.Date}`;
		td4.textContent = `${e.Phone}`;
		if (e.Phone !== "admin" && e.Phone !== "user") {
			td4.textContent = "unknown";
			td4.style.color = "white";
			td4.style.backgroundColor = "red";
		}
		td5.textContent = `${e.Number}`;
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		tr.appendChild(td6);

		action.onclick = () => {
			tr.remove();
			fetch(`https://api-generator.retool.com/Ft4671/data/${e.id}`, {
				method: "DELETE",
			});
		};
		clone.querySelector("tbody")!.appendChild(tr);
	}
	app!.appendChild(clone);
}

const form = document.getElementById("addForm") as HTMLFormElement;
form.onsubmit = async (e) => {
	e.preventDefault();
	const nameInput = document.getElementById("nameInput") as HTMLInputElement;
	const dateInput = document.getElementById("dateInput") as HTMLInputElement;
	const phoneInput = document.getElementById("phoneInput") as HTMLInputElement;
	const numberInput = document.getElementById(
		"numberInput"
	) as HTMLInputElement;

	const newitem = {
		Name: nameInput.value,
		Date: new Date(dateInput.value).toISOString().split("T")[0],
		Phone:
			phoneInput.value === "admin" || phoneInput.value === "user"
				? phoneInput.value
				: "unknown",
		Number: parseInt(numberInput.value),
	};

	const res = await fetch("https://api-generator.retool.com/Ft4671/data", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newitem),
	});

	const addedItem = await res.json();
	app!.innerHTML = "";
	form.reset();
	init();
};

init();
