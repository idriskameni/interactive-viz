document.addEventListener("DOMContentLoaded", function() {
    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");
    const button3 = document.getElementById("button3");
  
    const visual1 = document.getElementById("visual1");
    const visual2 = document.getElementById("visual2");
    const visual3 = document.getElementById("visual3");
  
    function showVisual1() {
      visual1.style.display = "block";
      visual2.style.display = "none";
      visual3.style.display = "none";
    }
  
    function showVisual2() {
      visual1.style.display = "none";
      visual2.style.display = "block";
      visual3.style.display = "none";
    }
  
    function showVisual3() {
      visual1.style.display = "none";
      visual2.style.display = "none";
      visual3.style.display = "block";
    }
  
    button1.addEventListener("click", showVisual1);
    button2.addEventListener("click", showVisual2);
    button3.addEventListener("click", showVisual3);
  
    // Show visual 1 by default
    showVisual1();
  });
  