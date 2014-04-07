#pragma strict

var strength : int = 1;
var weight : int = 1;
var water : int = 10; //player's water level, will also be used to size water bar
var framecount = 0; //used to only decrement water in specific intervals
var difficulty = 30;
/*difficulty is a parameter that is inversely proportional to the 
speed at which the water depletes. For example: a difficulty setting of 
120 means that the water level for the player will decrease every 2 seconds, but a 
difficulty level of 60 means the water level will deplete every 1 second 
*/

/*debugging purpose, remove later*/
var TextPosition : Rect = Rect(0, 0, 256, 128);
var style : GUIStyle;
var Text = "water:  ";


function Start () {
	//for debugging, remove this line later
	style.normal.textColor = Color.white;
}

function OnTriggerEnter(other : Collider)
{
	if(other.tag == "Water")
	{
		water += 10;
		Destroy(other.gameObject);
	}
	if(other.tag == "Weight")
	{
		incrementWeight();
		Destroy(other.gameObject);
	}
}

function incrementWeight(){
	weight = weight + 1;
}

function incrementStrength(){
	strength = strength + 1;
}

function getWeight(){
	return weight;
}

function getStrength(){
	return strength;
}

function refillWater(){
	water = 10;
}

function getWater(){
	return water;
}

function depleteWater(){
		Debug.Log(water);
		water = getWater()- 1;
		if(water <= 0){
			Application.LoadLevel("gameover");
		}
	
}
/*debugging purpose, remove this function later */
function OnGUI()
{
	GUI.Label(TextPosition, Text, style);
}


function Update () {
	/*decrement water level at a constant rate during gameplay */
		if(framecount == difficulty){
			depleteWater();
			framecount = 0;
		} 
		else {
			framecount = framecount + 1;
		}
		Text = "water level: " + water + "\nstrength: "+ strength + 
		"\nweight = " + weight;
		//debugging purposes, remove later
		GUI.Label(TextPosition, Text, style);
}