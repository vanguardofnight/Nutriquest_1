function Start() 
{
	Screen.autorotateToLandscapeRight = true;
}

function OnMouseDown(){
	if(gameObject.name == "Newgame_Texture") {
		Application.LoadLevel("lvl1");
	}	
	if(gameObject.name == "Levelselect_Texture") {
		Application.LoadLevel("lvlselect");
	}
	if(gameObject.name == "Options_Texture") {
		Application.LoadLevel("settingsmenu");
	}
}