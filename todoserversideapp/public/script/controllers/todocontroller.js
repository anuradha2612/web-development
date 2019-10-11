tdapp.controller('todocontroller',function($scope,$http)
{
                  var refresh=function()
                {  $http.get('/contactlist').success(function(response)
                                               {
                          console.log("i get the data");
                      $scope.contactlist=response;
                      $scope.contact="";
                  });
                };
               refresh();
                 $scope.addContact=function()
                 {
                     console.log( $scope.contact);
                       $http.post('/contactlist',$scope.contact).success(function(response)
                   {                                                     
                       $scope.contactlist=response.data;
                        console.log(response); 
                          refresh(); 
                       });
                 };
              $scope.deleteContact=function(id)
              {
                 console.log(id); 
                 $http.delete('/contactlist/'+id).success(function(response)
                                                {
                                                  refresh();
                                                });
              };
             $scope.editContact=function(id)
             {
                  console.log(id); 
                   $http.get('/contactlist/'+id).success(function(response)
                                                {
                                                  $scope.contact=response;
                                                });
             };
            $scope.updateContact=function()
            {
                 console.log($scope.contact._id); 
                $http.put('/contactlist/'+$scope.contact._id,$scope.contact).success(function(response)
                                               {
                                                  refresh();
                                                });                      
            };
});