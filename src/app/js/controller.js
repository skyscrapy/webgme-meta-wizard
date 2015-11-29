var app = angular.module('webgmeWizard', []);
app.dataModel = {
    projects: null,
    branches: null,
    selectedProject: null,
    selectedBranch: null
};

app.client = null;

app.run(function () {
    console.log("GME run", GME);
    console.log("Data model", app.dataModel);
});

app.gmeInit = function () {
    console.log('GME init app', GME);
    var client = new GME.classes.Client(GME.gmeConfig);

    client.connectToDatabase(function (err) {
        if (err) {
            console.log(err);
        }
        app.client = client;
        console.log("Connected to database", app.client);
        app.client.getProjectsAndBranches(false, function (err, myProjects) {
            if (err) {
                console.log(err);
            }
            app.dataModel.projects = myProjects;
        });
    });
};

app.controller('projectCtrl', function ($scope) {
    $scope.submitForm = function () {
        /* create project from seed*/
        if (app.client) {
            var parameters = {
                seedName: 'guest+seed',
                seedBranch: 'master',
                projectName: $scope.projectName
            };
            console.log(parameters);
            app.client.seedProject(parameters, function (err, result) {
                if (err) {
                    console.log(err);
                }
            });
        }
    };
});

app.controller('branchCtrl', function ($scope) {
    $scope.submitForm = function () {
        /* create branch from existing project */
        var projectId = 'guest+' + $scope.projectName,
            newBranch = $scope.branchName,
            newHash;
        if (app.client) {
            app.client.selectProject(projectId, null, function (err) {
                if (err) {
                    console.log(err);
                }
                newHash = app.client.getActiveCommitHash();
                app.client.createBranch(projectId, newBranch, newHash, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("new branch created");
                });
            });
        }
    };
});

app.controller('territoryCtrl', function ($scope) {
    var projectId = null;
    $scope.getBranches = function () {
        if (app.client) {
            projectId = 'guest+' + $scope.selectedProject;
            app.client.selectProject(projectId, null, function (err) {
                if (err) {
                    console.log(err);
                }
                app.client.getBranches(projectId, function (err, myBranches) {
                    if (err) {
                        console.log(err);
                    }
                    app.dataModel.branches = myBranches;
                    console.log(app.dataModel);
                });

            })
        }
    };

    $scope.loadTerritory = function () {
        if(app.client) {
            app.dataModel.selectedProject = $scope.selectedProject;
            app.dataModel.selectedBranch = $scope.selectedBranch;
            console.log("good");
        } else {
            console.log("bad");
        }
    };
});


app.controller('attributesCtrl', function ($scope) {
    /* list all the projects and branches*/
    $scope.submitForm = function () {
        /* create project from seed*/
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
});