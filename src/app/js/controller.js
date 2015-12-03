var wizardControllers = angular.module('wizardControllers', []);

var patterns = {};
patterns[''] = {children: 1};

var eventHandler = function (events) {
    var i, nodeObj;
    for (i = 0; i < events.length; i += 1) {
        if (events[i].etype === 'load') {
            nodeObj = wizardApp.client.getNode(events[i].eid);
            console.log('eventHandler load', nodeObj);
        } else if (events[i].etype === 'update') {
            nodeObj = wizardApp.client.getNode(events[i]);
            console.log('eventHandler update', nodeObj);
        } else if (events[i].etype === 'unload') {
            console.log('eventHandler', 'unload');
        } else {
            console.log('eventHandler', 'else');
        }
    }
};

wizardControllers.controller('IndexCtrl', ['$scope', '$location',
    function ($scope, $location) {
        $scope.goCreateProject = function () {
            $location.path('/newProject');
        };

        $scope.goOpenProject = function () {
            $location.path('/openProject');
        };
    }]);

wizardControllers.controller('NewProjectCtrl', ['$scope', '$location',
    function ($scope, $location) {
        $scope.submitForm = function () {
            /* create project from seed*/
            if (wizardApp.client) {
                var parameters = {
                    seedName: 'guest+seed',
                    seedBranch: 'master',
                    projectName: $scope.projectName
                };
                wizardApp.client.seedProject(parameters, function (err, result) {
                    console.log('creating project..');
                    if (err) {
                        console.log(err);
                    }
                });
                wizardApp.dataModel.selectedProject = 'guest+'+parameters.projectName;
                $location.path('/newBranch');
            }
        };
    }]);

wizardControllers.controller('NewBranchCtrl', ['$scope', '$location',
    function ($scope, $location) {
        $scope.submitForm = function () {
            /* create branch from existing project */
            var projectId =wizardApp.dataModel.selectedProject,
                newBranch,
                newHash;

            if ($scope.branchName) {
                newBranch = $scope.branchName;
                if (wizardApp.client) {
                    wizardApp.client.selectProject(projectId, null, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        newHash = wizardApp.client.getActiveCommitHash();
                        wizardApp.client.createBranch(projectId, newBranch, newHash, function (err) {
                            console.log("creating new branch..");
                            if (err) {
                                console.log(err);
                            }
                        });
                    });
                }
            } else {
                newBranch = 'master';
            }
            wizardApp.dataModel.selectedBranch = newBranch;
            console.log(wizardApp.dataModel);
            $location.path('/newModel');
        };
    }]);

wizardControllers.controller('NewModelCtrl', ['$scope', '$location',
    function ($scope, $location) {
        $scope.getNodes = function () {
            wizardApp.client.selectProject(wizardApp.dataModel.selectedProject,
                wizardApp.dataModel.selectedBranch,
                function (err) {
                    if (err) {
                        console.log(err);
                    }
                    $scope.models = wizardApp.client.getAllMetaNodes();
                })
        };

        $scope.addRow = function () {
            var childName = $scope.childName;
            if (childName) {
                wizardApp.client.startTransaction();
                wizardApp.client.updateTerritory(wizardApp.userId, patterns);
                var childCreationParams = {
                    parentId: '',
                    baseId: '/1'
                };
                var rootNode = wizardApp.client.getNode('');
                var sheetId = (rootNode.getSetNames())[1];

                var childId = wizardApp.client.createChild(childCreationParams, 'create child');
                wizardApp.client.setAttributes(childId, 'name', childName, 'set attributes');
                //wizardApp.client.setRegistry(childId, 'position', {x: 200, y:200}, 'set registry');
                wizardApp.client.addMember('', childId, 'MetaAspectSet', 'add member2');
                wizardApp.client.setMemberRegistry('', childId, 'MetaAspectSet', 'position', {
                    x: 400,
                    y: 400
                }, 'member registry');
                wizardApp.client.addMember('', childId, sheetId, 'add member1');
                wizardApp.client.setMemberRegistry('', childId, sheetId, 'position', {
                    x: 400,
                    y: 400
                }, 'member registry');
                wizardApp.client.completeTransaction('transaction complete', function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            } else {
                alert('please enter the name');
            }
        };

        $scope.modifyNode = function (model) {
            wizardApp.dataModel.selectedNode = model;
            $location.path('/attributes');
        };

        $scope.deleteNode = function(model) {
            if (model) {
                var rootNode = wizardApp.client.getNode('');
                var sheetId = (rootNode.getSetNames())[1];
                wizardApp.client.updateTerritory(wizardApp.userId, patterns);
                wizardApp.client.startTransaction();

                console.log(sheetId, model.getId());

                wizardApp.client.removeMember('', model.getId(), 'MetaAspectSet', 'remove node');
                wizardApp.client.removeMember('', model.getId(), sheetId, 'remove node');
                wizardApp.client.delMoreNodes([model.getId()], 'delete node');

                wizardApp.client.completeTransaction('transaction complete', function (err) {
                    if (err) {
                        console.log(err);
                    }

                });
            }
        };

        $scope.submitForm = function () {

        };
    }]);

wizardControllers.controller('OpenProjectCtrl', ['$scope', '$location',
    function ($scope, $location) {
        var projectId = null;
        $scope.getBranches = function () {
            $scope.projects = wizardApp.dataModel.projects;
            if ($scope.selectedProject) {
                wizardApp.dataModel.selectedProject = 'guest+' + $scope.selectedProject;
                if (wizardApp.client) {
                    projectId = wizardApp.dataModel.selectedProject;
                    wizardApp.client.selectProject(projectId, null, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        wizardApp.client.getBranches(projectId, function (err, myBranches) {
                            if (err) {
                                console.log(err);
                            }
                            wizardApp.dataModel.branches = myBranches;
                            $scope.branches = wizardApp.dataModel.branches;
                            if ($scope.selectedBranch) {
                                wizardApp.dataModel.selectedBranch = $scope.selectedBranch;
                            }
                        });
                    })
                }
            }
            console.log(wizardApp.dataModel);
        };

        $scope.submitForm = function () {
            wizardApp.userId = wizardApp.client.addUI(null, eventHandler);
            wizardApp.client.updateTerritory(wizardApp.userId, patterns);
            console.log(wizardApp.dataModel);
            $location.path('/newModel');
        };
    }]);


wizardApp.controller('AttributeCtrl', ['$scope', '$location',
    function ($scope, $location) {
        $scope.selectedNode = wizardApp.dataModel.selectedNode;
        $scope.attrNames = wizardApp.dataModel.selectedNode.getValidAttributeNames();
        $scope.attrValues = {};
        $scope.types = ['string', 'integer', 'float', 'asset'];

        $scope.setAttrVal = function(attrName){
            var newName = $scope.attrValues[attrName];
            if (newName) {
                wizardApp.client.startTransaction();
                wizardApp.client.updateTerritory(wizardApp.userId, patterns);

                var nodeId = $scope.selectedNode.getId();
                wizardApp.client.setAttributes(nodeId, attrName, newName, 'set attributes');
                wizardApp.client.completeTransaction('transaction complete', function (err) {
                    if (err) {
                        console.log(err);
                    }

                });
            } else {
                alert('no change');
            }
        };

        $scope.resetAttr = function(attrName){
            var myNode = wizardApp.dataModel.selectedNode;
            if (myNode) {
                wizardApp.client.updateTerritory(wizardApp.userId, patterns);
                wizardApp.client.startTransaction();

                wizardApp.client.delAttributes(myNode.getId(), attrName, 'reset attr');

                wizardApp.client.completeTransaction('transaction complete', function (err) {
                    if (err) {
                        console.log(err);
                    }

                });
            }
        };

        $scope.refresh = function () {
            wizardApp.client.updateTerritory(wizardApp.userId, patterns);
        };


        $scope.addAttr = function () {
            var myAttrName = $scope.attrName;
            var myType = $scope.attrType;
            var myNode = wizardApp.dataModel.selectedNode;
            if(myAttrName && myType) {
                wizardApp.client.updateTerritory(wizardApp.userId, patterns);

                wizardApp.client.startTransaction();

                wizardApp.client.setAttributeSchema(myNode.getId(), myAttrName, {
                    type: myType
                });

                wizardApp.client.completeTransaction('transaction complete', function (err) {
                    if (err) {
                        console.log(err);
                    }

                });
            } else {
                alert('validation failed')
            }
        };

        $scope.goBack = function () {
            $location.path('/newModel');
        };
    }]);