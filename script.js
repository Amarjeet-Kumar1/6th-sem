{
  const inputform = document.getElementById('registration');
  const regform = document.getElementById('searchform');
  let item;
  regform.onsubmit = (e) => {
    e.preventDefault();
    const reg = inputform.value;
    inputform.value = '';
    fetch(`http://65.0.29.125/api/send_data/${reg}`, {
      mode: 'cors',
      method: 'GET',
    })
      .then(async (res) => {
        const data = await res.json();
        document.getElementById('name').innerHTML = data.Name;
        document.getElementById('reg').innerHTML = data.RegNo;
        document.getElementById('college').innerHTML = data.College;
        document.getElementById('branch').innerHTML = data.Branch;
        document.getElementById('rank').innerHTML = data.Rank;
        item = data;
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);
      })
      .catch(
        (data) => (document.getElementById('myChart').innerHTML = 'Not found')
      );
  };
  function drawChart() {
    // Set Data
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Semester');
    data.addColumn('number', 'SGPA');
    data.addRows([
      [1, Number(item.SGPA1)],
      [2, Number(item.SGPA2)],
      [3, Number(item.SGPA3)],
      [4, Number(item.SGPA4)],
      [5, Number(item.SGPA5)],
      [6, Number(item.SGPA6)],
    ]);

    // Set Options
    var options = {
      title: 'Semester vs SGPA (created by Amarjeet)',
      lineWidth: 3,
      hAxis: { title: 'Semester' },
      vAxis: { title: 'SGPA' },
      legend: 'none',
    };
    // Draw Chart
    var chart = new google.visualization.LineChart(
      document.getElementById('myChart')
    );
    chart.draw(data, options);
  }
}
