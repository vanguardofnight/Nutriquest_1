var durationMultiplier 	: float = 1;
var maxTimer 			: int;
var minTimer			: int;

// XY Coordinates for sections
// x: minX, y: maxX, z: minY, w: maxY
var spots 	: Vector4[]; 
var size 	: int;

// Timers for respawning
var arr_timers 		: int[];
var arr_maxTimers 	: int[];

// Stored food objects
private var arr_objects : GameObject[];

// Stored prefab names
private var arr_prefabs : String[];

// Std var of respiration rate from BioHarness
var stdRate				: float = 0;
var avgRate				: float = 1;

// BioHarness
private var bioHarness : GameObject;
private var bioControl : BioHarnessController;

function Start () {		
	// BioHanress Setup
	bioHarness = GameObject.Find( "BioHarness" );
	bioControl = bioHarness.GetComponent( BioHarnessController );
	
	size = spots.Length;
	arr_timers = new int[size];
	arr_maxTimers = new int[size];
	arr_objects = new GameObject[size];
	
	// Assign initial timer
	minTimer = 10;
	maxTimer = 20;
	
	for(var i = 0; i < size; i++){
		// Minimum 5 seconds to MAX
		arr_maxTimers[i] = Random.Range(minTimer, maxTimer);
		arr_timers[i] = arr_maxTimers[i];
	}
	
	// We currently have 11 food items total
	// This part must be hard coded
	arr_prefabs = new String[11];
	arr_prefabs[0] = "gf_apple";
	arr_prefabs[1] = "gf_banana";
	arr_prefabs[2] = "gf_bread";
	arr_prefabs[3] = "gf_milk";
	arr_prefabs[4] = "gf_steak";
	arr_prefabs[5] = "bf_cake_1";
	arr_prefabs[6] = "bf_cake_2";
	arr_prefabs[7] = "bf_candy_corn";
	arr_prefabs[8] = "bf_chocolate_chip_cookie";
	arr_prefabs[9] = "bf_icecream_1";
	arr_prefabs[10] = "water";
	
	InvokeRepeating("CountDown", 1.0, 1.0);
}

function CountDown (){
	for(var i=0; i< size; i++) {
		if(arr_timers[i] == arr_maxTimers[i]){
			// 20% Chances for respawn a water object
			if(Random.Range(0,4) == 0) {
				arr_objects[i] = Instantiate(Resources.Load(arr_prefabs[10]), RandVec3(i), Quaternion.identity);
			} else {		
				arr_objects[i] = Instantiate(Resources.Load(arr_prefabs[Random.Range(0,9)]), RandVec3(i), Quaternion.identity);
			}
			arr_timers[i]--;
		} else if(arr_timers[i] <= 0) {
			var localTimer : int;
			if ( bioControl.IsConnected() ) {
				var rRate = float.Parse(bioControl.GetRespirationRate());
				if ( Mathf.Abs(rRate - 6) < 1 )
					localTimer = maxTimer;
				else if ( Mathf.Abs(rRate - 6) < 2 )
					localTimer = maxTimer - maxTimer * 0.1;
				else if ( Mathf.Abs(rRate - 6) < 3 )
					localTimer = maxTimer - maxTimer * 0.2;
				else if ( Mathf.Abs(rRate - 6) < 4 )
					localTimer = maxTimer - maxTimer * 0.3;
				else if ( Mathf.Abs(rRate - 6) < 5 )
					localTimer = maxTimer - maxTimer * 0.4;
				else
					localTimer = maxTimer * 0.5;
			} else {
				localTimer = maxTimer;
			}
			
			arr_maxTimers[i] = Random.Range(minTimer, localTimer);
			
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
	var x : float = Random.Range(spots[i].x, spots[i].y);
	var y : float = Random.Range(spots[i].z, spots[i].w);
	return Vector3(x,y,0);
}