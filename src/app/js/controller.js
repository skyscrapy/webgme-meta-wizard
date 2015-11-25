var app = angular.module('webgmeWizard', []);

app.controller('indexCtrl', function ($scope, $log, $window) {
    $scope.goCreateProject = function () {
        $log.log('new project');
        $window.location.href = "newProject.html";
    };
    $scope.goOpenProject = function () {
        $log.log('open project');
        $window.location.href = "openProject.html";
    };
});

app.controller('projectCtrl', function ($scope, $window) {
    $scope.submitForm = function () {
    // TO-DO here we create the project depending on the user's input and then share the project name via angular service
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
        $window.location.href = "newBranch.html";
    };
    
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
        $window.location.href = "newModel.html";
    };
});

app.controller('modelsCtrl', function ($scope, $window) {
	$scope.models = [
        // at first no metanodes   
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

	$scope.submitForm = function () {
		$window.location.href = "newAttrs.html";
	};
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
		//var attrVal = ;
		var newField = {'attrName':$scope.attrList[idx],'attrVal':attrVal};
		$scope.attrs.splice(0,1,newField);
		//GMEAPI updateAttrValue
	};
	$scope.submitForm = function () {
		$window.location.href = "newRelation.html"
	};
    /* list all the projects and branches*/
    /*
    var client = new GME.classes.Client(GME.gmeConfig);

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

    $scope.submitForm = function () {
        var projectId = 'guest+' + $scope.selectedProject;

        client.connectToDatabase(function (err) {
            if (err) {
                console.log(err);
            }
            client.selectProject(projectId, null, function (err) {
                if (err) {
                    console.log(err);
                }
                client.getBranches(projectId, function (err, myBranches) {
                    if (err) {
                        console.log(err);
                    }
                    $scope.branches = myBranches;
                    console.log($scope.branches);
                });
            });
        });
    };
    */
    
});