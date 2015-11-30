var app = angular.module('webgmeWizard', ['ngRoute']);
    
app.controller('indexCtrl', function ($scope, $log, $window) {
    $scope.goCreateProject = function () {
        $log.log('new project');
    };
    $scope.goOpenProject = function () {
        $log.log('open project');
    };
}).config(
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/newProject', {
        templateUrl: '/newProject.html',
        controller: 'newprojectCtrl'
      }).
      when('/openProject', {
        templateUrl: '/openProject.html',
        controller: 'openCtrl'
      }).
      otherwise({
        templateUrl: '/startPage.html',
        controller: 'indexCtrl'
      });
  });

app.controller('newprojectCtrl', function ($scope, $window) {
    $scope.submitForm = function () {
    // TO-DO here we create the project with the name and then share the project name via angular service
    // so that we can continue to create the branch, models and the detailed attributes of them accordingly
        /* create project from seed*/
        /*
        var client = new GME.classes.Client(GME.gmeConfig);

        client.connectToDatabase(function (err) {
            if (err) {
                console.log(err);
            }
            var parameters = {
                seedName: 'guest+seed',
                seedBranch: 'master',
                projectName: $scope.projectName
            };
            console.log(parameters);
            client.seedProject(parameters, function (err, result) {
                if (err) {
                    console.log(err);
                }
            });
        });
        */
    };
    
}).config(
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/newBranch', {
      	templateUrl: '/newBranch.html',
      	controller: 'branchCtrl'
      });
});

app.controller('openCtrl', function($scope, $window) {
	// TO-DO list projects and branches for users to select to open
	$scope.projects = [];
	$scope.branches = [];
}).config(
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/newModel', {
      	templateUrl: '/newModel.html',
      	controller: 'modelsCtrl'
      });
});

app.controller('branchCtrl', function ($scope, $window) {
  // TO-DO here we create the branch according to the user's input. If it's blank->master branch, else create a new one
    /* list all the projects and branches*/
    /*
    var client = new GME.classes.Client(GME.gmeConfig);
    console.log(client);

    client.connectToDatabase(function (err) {
        if (err) {
            console.log(err);
        }
        client.getProjectsAndBranches(false, function (err, myProjects) {
            if (err) {
                console.log(err);
            }
            $scope.projects = myProjects;
        });
    });
*/
    $scope.submitForm = function () {
        /* create project from seed*/
        /*
        var projectId = 'guest+' + $scope.projectName,
            newBranch = $scope.branchName,
            newHash;
        client.connectToDatabase(function (err) {
            if (err) {
                console.log(err);
            }
            client.selectProject(projectId, null, function (err) {
                if (err) {
                    console.log(err);
                }
                newHash = client.getActiveCommitHash();
                client.createBranch(projectId, newBranch, newHash, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("new branch created");
                });
            });
        });
        */
    };
}).config(
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/newModel', {
      	templateUrl: '/newModel.html',
      	controller: 'modelsCtrl'
      });
});

app.controller('modelsCtrl', function ($scope, $window) {
	$scope.models = [
        // TO-DO at first no metanodes if creating a new project, nonetheless we need to load models if opening an existing one
                    ];
	$scope.addRow = function(){		
		// TO-DO add the model into our DB using GMEAPI
		$scope.models.push({ 'modelName':$scope.modelName });
		$scope.modelName='';
	};
	$scope.deleteModel = function(idx){
		
		var delModel = $scope.models[idx];
		// TO-DO delete the corresponding model from our DB
		// GMEAPI.DeleteModel({ modelName: delModel.modelName }, function (success) {
        	$scope.models.splice(idx, 1); // remove one element from index idx
    //});
	};

}).config(
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/newAttrs', {
      	templateUrl: '/newAttrs.html',
      	controller: 'attrsCtrl'
      });
});

app.controller('attrsCtrl', function ($scope, $window) {
	/* TO-DO we need to list all models at the left side of webpage at first. Then if the user clicks on the model, we need to display 
	   the editing attributes at the right of the page such as ID, Name, MetaTypes so on so forth.
	*/
	$scope.models = [
        // load the meta-node  
        {'modelName':'train'},
        {'modelName':'track'},
        {'modelName':'station'}
                    ];
	$scope.attrs = [
        // at first there should be null   
        {'attrName':'id','attrVal':'123'},
        {'attrName':'name','attrVal':'track'},
        {'attrName':'metatype','attrVal':'string'}
                    ];
    $scope.attrList = ['id', 'name', 'metatype'];
    $scope.getAttr = function (idx) {
		// TO-DO get the attributes of the idx meta-node, using API to update the attrs
		$scope.attrs = [];
	};                
	$scope.setAttrVal = function (idx) {
		// TO-DO read the modified attrVale and store them into DB for update
		var attrVal = 'modifedVal';
		var newField = {'attrName':$scope.attrList[idx],'attrVal':attrVal};
		$scope.attrs.splice(idx,1,newField);
		//GMEAPI updateAttrValue
	};
    
}).config(
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/newRelation', {
      	templateUrl: '/newRelation.html',
      	controller: 'relationsCtrl'
      });
});

app.controller('relationsCtrl', function ($scope, $window) {
	/* TO-DO we need to list all the models so as to select the src and the dst node to add connection
	*/
	$scope.relations = [
        
                    ];
	$scope.addRelation = function (){
	    // TO-DO modify the value
		$scope.relations.push({'relationsrc':'Train','relationdst':'Track'});
	};
	$scope.deleteRelation = function (idx){
		var delRelation = $scope.relations[idx];
		// TO-DO delete the relation
        $scope.relations.splice(idx, 1);
	};
	$scope.submitForm = function () {
		$window.location.href = "index.html";
	};
  
    
}).config(
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/finish', {
      	templateUrl: '/index.html',
      	controller: 'indexCtrl'
      });
});
