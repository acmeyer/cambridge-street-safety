mapboxgl.accessToken = 'pk.eyJ1IjoiYWNtZXllciIsImEiOiJjamVhNmNlcmkwdzEzMnFsZW5oMHU2bXloIn0.AOuEMOx9-yDjg4c5unIjxg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/acmeyer/cjjm448c35cw02smkjqk00bn2'
});

map.on('load', function() {
  $('.menu .menu-item').click(function(e) {
    var filters = ['all'];
    if ($(this).closest('.menu').attr('id') === 'type-menu') {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
      } else {
        $(this).addClass('active');
      }
    } else {
      if (!$(this).hasClass('active')) {
        $('#year-menu .menu-item').removeClass('active');
        $(this).addClass('active');
      }          
    }
    var typeFilters = ['any'];
    $('#type-menu .menu-item.active').each(function(index) {
      switch($(this).attr('id')) {
        case 'other':
          typeFilters.push(['==', 'No Bike or Pedestrian Involved', true]);
          break;
        case 'bicycle':
          typeFilters.push(['==', 'Bicycle Involved', true]);
          break;
        case 'pedestrian':
          typeFilters.push(['==', 'Pedestrian Involved', true]);
          break;
      }
    });
    filters.push(typeFilters);
    
    var yearFilters = ['any'];
    $('#year-menu .menu-item.active').each(function(index) {
      if ($(this).attr('id') === 'all') {
        yearFilters.push(['has', 'Year']);
      } else {
        yearFilters.push(['==', 'Year', parseInt($(this).attr('id'))]);
      }
    });
    filters.push(yearFilters);

    map.setFilter('all-accidents', filters);  
  });
});