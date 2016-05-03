angular.module('myApp', []).controller('employeeCtrl', function ($scope) {

    // Assign back end to myData var on the Scope
    $scope.myData = new Firebase('https://glaring-heat-6775.firebaseio.com/Employees');

    $scope.employeeName = '';
    $scope.employeeAge = null;
    $scope.employees = {};

    // Persist Employee on click to Firebase
    $scope.saveEmployee = function () {

        // Set the key to path https://glaring-heat-6775.firebaseio.com/Employees/empName
        var empName = $scope.employeeName;

        $scope.myData.child(empName).set({
            employeeName: $scope.employeeName,
            employeeAge: $scope.employeeAge
        });


        $scope.employeeName = '';
        $scope.employeeAge = null;
    };

    // Delete Employee on click from Firebase
    $scope.deleteEmployee = function (employeeName) {

        console.log('Inside deleteEmployee()   ');
        console.log('employee.employeeName  ');
        console.log(employeeName);

        var currentEmployee = $scope.employees[employeeName];

        console.log('This is employee choosen by employeeName: ');
        console.log(currentEmployee);

        // Remove employee by the key at https://glaring-heat-6775.firebaseio.com/Employees/employeeName
        $scope.myData.child(employeeName).set(null);
        $scope.employeeName = '';
        $scope.employeeAge = null;
    };


    // Event listener for changes in Firebase data model
    $scope.myData.on('value', function (snapshot) {

        $scope.employees = snapshot.val();

        console.log('This is $scope.employees after trigger: ');
        console.log($scope.employees);


    });

});
