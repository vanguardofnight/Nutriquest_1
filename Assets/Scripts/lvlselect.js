function Start() 
{
	Screen.autorotateToLandscapeRight = true;
}

function OnMouseDown(){
	if(gameObject.name == "Level1_Texture") {
		Application.LoadLevel("lvl1");
	}	
	if(gameObject.name == "Level2_Texture") {
		Application.LoadLevel("lvl2");
	}
	if(gameObject.name == "Level3_Texture") {
		Application.LoadLevel("lvl3");
	}
	if(gameObject.name == "Level4_Texture") {
		Application.LoadLevel("lvl4");
	}
	if(gameObject.name == "Mainmenu_Texture") {
		Application.LoadLevel("intro");
	}
}