var bioHarness : GameObject;
var control : BioHarnessController;
var durationMultiplier : float = 1;

var maxTimer : int = 10;
// Timers for respawning 6 food items
var arr_timers : int[];
var arr_maxTimers : int[];

// Stored food objects
var arr_objects : GameObject[];

// Stored prefab names
var arr_prefabs : String[];

function Start () {
	/* Uncomment this before extracting Unity Android Project 
	bioHarness = GameObject.Find("BioHarness");
	control = bioHarness.GetComponent(typeof(BioHarnessController));
	*/

	arr_timers = new int[6];
	arr_maxTimers = new int[6];
	
	for(var i = 0; i < 6; i++){
		arr_maxTimers[i] = Random.Range(5, maxTimer);
		arr_timers[i] = arr_maxTimers[i];
	}
	
	arr_objects = new GameObject[6];
	
	arr_prefabs = new String[11];
	arr_prefabs[0] = "lv4_gf_apple";
	arr_prefabs[1] = "lv4_gf_banana";
	arr_prefabs[2] = "lv4_gf_bread";
	arr_prefabs[3] = "lv4_gf_milk";
	arr_prefabs[4] = "lv4_gf_steak";
	arr_prefabs[5] = "lv4_bf_cake_1";
	arr_prefabs[6] = "lv4_bf_cake_2";
	arr_prefabs[7] = "lv4_bf_candy_corn";
	arr_prefabs[8] = "lv4_bf_chocolate_chip_cookie";
	arr_prefabs[9] = "lv4_bf_icecream_1";
	arr_prefabs[10] = "lv4_water";
	
	InvokeRepeating("CountDown", 1.0, 1.0);
}

function Update () {
}

function CountDown (){
	for(var i=0; i< 6; i++) {
		if(arr_timers[i] == arr_maxTimers[i]){
			if(Random.Range(0,2) == 0) {
				arr_objects[i] = Instantiate(Resources.Load(arr_prefabs[10]), RandVec3(i), Quaternion.identity);
			} else {		
				arr_objects[i] = Instantiate(Resources.Load(arr_prefabs[Random.Range(0,9)]), RandVec3(i), Quaternion.identity);
			}
			arr_timers[i]--;
		} else if(arr_timers[i] <= 0){
			/*
			var localTimer : float = maxTimer * control.GetStd() / control.GetAvg();
			*/
			arr_maxTimers[i] = Random.Range(5, maxTimer); // ,(localTimer);
			arr_timers[i] = arr_maxTimers[i];
			if(arr_objects[i] != null) {
				Destroy(arr_objects[i]);		
			} else {
				// Do Nothing
			}
		} else {
			arr_timers[i]--;
		}
	}
}

function RandVec3(i){
	/*
	Ranges (minX, maxX, minY, maxY)
	Spot 0: (-12.7, 0, 4.1, 6.3)
	Spot 1: (4.1, 12.7, 2.1, 4.1)
	Spot 2: (2.1, 12.7, 8.4, 12.5)
	Spot 3: (-8.4, 0, 10.5, 10.5)
	Spot 4: (0.5, 12.7, 16.8, 23.0)
	Spot 5: (-12.5, 0.0, 0.0, 23.0)
	*/
	var x : float;
	var y : float;
		
	switch(i){
		case 0:
			x = Random.Range(-12.7,0.0);
			y = Random.Range(4.1, 6.3);
			break;
		case 1:
			x = Random.Range(4.1, 12.7);
			y = Random.Range(2.1, 4.1);
			break;
		case 2:
			x = Random.Range(2.1 ,12.7);
			y = Random.Range(8.4, 12.5);
			break;
		case 3:
			x = Random.Range(-8.4, 0);
			y = 10.5;
			break;
		case 4:
			x = Random.Range(0.5, 12.7);
			y = Random.Range(16.8, 23.0);
			break;
		case 5:
			x = Random.Range(-12.5, 0.0);
			y = Random.Range(21.0 , 23.0);
			break;
		}
	return Vector3(x,y,0);
}