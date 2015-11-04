var app = angular.module('webgmeWizard', []);

app.controller('projectCtrl', function ($scope) {
    $scope.submitForm = function () {
        /* create project from seed*/
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
    };
});

app.controller('branchCtrl', function ($scope) {
    /* list all the projects and branches*/
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

    $scope.submitForm = function () {
        /* create project from seed*/
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
    };
});

app.controller('attributesCtrl', function ($scope) {
    /* list all the projects and branches*/
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
