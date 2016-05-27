var myApp = angular.module('myApp', [])

// Main controller
.controller('MainController', function($scope) {

    $scope.data = [
      {id: 0, color: '#1F3A93'},
      {id: 1, color: '#1F3A93'},
      {id: 2, color: '#1F3A93'},
      {id: 3, color: '#1F3A93'}
    ];

     // Array of objects that correspond to each step
     $scope.settings = [
       {numD: 1, filter:function(d){return d.id == 0}},
       {numD: 10, filter:function(d){return d.id == 1}},
       {numD: 50, filter:function(d){return d.id == 2}},
       {numD: 300, filter:function(d){return d.id == 3}}
     ];

     $scope.step = 0;
     $scope.sectionSet = [
       {text:'Section 1',color:'yellow'},
       {text:'Section 2',color:'royalblue'},
       {text:'Section 3',color:'orange'},
       {text:'Section 4',color:'red'}
     ];

     // Desired section height
     $scope.sectionHeight = 800;
 })

// Projects controller
.controller('ProjectsController', function($scope, ProjectData){
  ProjectData.then(function(data){
    $scope.projects = data
  })
})

// Scroll directive
.directive("scroll", function ($window) {
    return {
      restrict:'E', // this directive is specified as an html element <scroll>
      scope:false, // use global scope
      // Create a link function that allows dynamic element creation
      link:function(scope, elem) {
          angular.element($window).bind("scroll", function() {
              scope.step = Math.ceil(($(window).scrollTop() - $("scroll.scroller").offset()["top"])/scope.sectionHeight);
              scope.$apply();
         
          });
      }
    };
})

// Create a directive 'scatter' that creates scatterplots
.directive('dots', function($filter, $compile) {
	// Return your directive element
	return {
		restrict:'E', // this directive is specified as an html element <scatter>
  		scope:false,
		// Create a link function that allows dynamic element creation
		link:function(scope,elem,attrs){
			// Use the scope.$watch method to watch for changes to the step, then re-draw your chart
			scope.$watch('step', function() {

        // Instantiate your chart with given settings
        var numDots = scope.settings[scope.step].numD;
        var myChart = Dots().numNodes(numDots);

        // Get the current data
        var currentData = scope.data.filter(scope.settings[scope.step].filter);

  			// Wrapper element to put your svg (chart) in
		wrapper = d3.select(elem[0])
		          .datum(currentData)
		          .call(myChart);
			});
		}
	};
});