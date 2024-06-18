import AView from "./AView.js";

export default class extends AView {
	constructor(params){
		super(params);//call the constructor of the parent class
		this.setTitle("Friends");
	}

	async getHtml(){
		const friends = this.createHeader('friends', 'h2');
		const p = this.createParagraph('You have no friends');

		this.updateView(friends, p);
		return ;
	}
}