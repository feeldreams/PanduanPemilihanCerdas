document.addEventListener('DOMContentLoaded', function () {
    const questions = document.querySelectorAll('.question');
    const nextBtn = document.getElementById('nextBtn');
    const scoreContainer = document.getElementById('score-container');
    const scoreElement = document.getElementById('score');
    const chartCanvas = document.getElementById('chart');
    let welcome = true;
    let currentQuestion = 0;
    let score = 0;
    let opsiA = 0;
    let opsiB = 0;
    let opsiC = 0;
    const answerCounts = { A: 0, B: 0, C: 0 };

    function showQuestion(index) {
        questions.forEach(question => {
            question.style.display = 'none';
        });

        questions[index].style.display = 'block';

        if(welcome == true){
            questions[index].style.display = 'none';
        }
    }
    
    function nextQuestion() {
        const selectedOption = document.querySelector(`input[name="q${currentQuestion + 1}"]:checked`);

        if (selectedOption) {
            answerCounts[selectedOption.value]++;
            
            if (selectedOption.value === getCorrectAnswer(currentQuestion + 1)) {
                score++;
            }
            
            if (selectedOption.value === "A") {
                opsiA++;
            } else if (selectedOption.value === "B") {
                opsiB++;
            } else if (selectedOption.value === "C") {
                opsiC++;
            }
            
            currentQuestion++;

            if (currentQuestion < questions.length) {
                showQuestion(currentQuestion);
            } else {
                let persentaseA = (opsiA / questions.length) * 100;
                let persentaseB = (opsiB / questions.length) * 100;
                let persentaseC = (opsiC / questions.length) * 100;

                ratePaslon1.innerText = persentaseA.toFixed(1) + '%';
                ratePaslon2.innerText = persentaseB.toFixed(1) + '%';
                ratePaslon3.innerText = persentaseC.toFixed(1) + '%';

                console.log('Persentase Opsi A:', persentaseA.toFixed(1) + '%');
                console.log('Persentase Opsi B:', persentaseB.toFixed(1) + '%');
                console.log('Persentase Opsi C:', persentaseC.toFixed(1) + '%');

                const container = document.querySelector('.flex.flex-col.gap-y-5');
                const candidates = Array.from(container.children);
              
                candidates.sort(function (a, b) {
                    const ratingA = parseFloat(a.querySelector('span').innerText);
                    const ratingB = parseFloat(b.querySelector('span').innerText);
                    return ratingB - ratingA;
                });
              
                candidates.forEach(candidate => container.appendChild(candidate));
                
                scoreElement.textContent = `${score} out of ${questions.length}`;
                //scoreContainer.style.display = 'block';
                blockQuestion.style.display = 'none';

                blockChart.style.display = 'block';
                const getChartOptions = () => {
                    return {
                    series: [opsiA, opsiB, opsiC],
                    colors: ["#00A505", "#00DBFF", "#FF000F"],
                    chart: {
                        height: 420,
                        width: "100%",
                        type: "pie",
                    },
                    stroke: {
                        colors: ["white"],
                        lineCap: "",
                    },
                    plotOptions: {
                        pie: {
                        labels: {
                            show: true,
                        },
                        size: "100%",
                        dataLabels: {
                            offset: -25
                        }
                        },
                    },
                    labels: ["Anies - Muhaimin", "Prabowo - Gibran", "Ganjar - Mahfud"],
                    dataLabels: {
                        enabled: true,
                        style: {
                        fontFamily: "Inter, sans-serif",
                        },
                    },
                    legend: {
                        position: "bottom",
                        fontFamily: "Inter, sans-serif",
                    },
                    yaxis: {
                        labels: {
                        formatter: function (value) {
                            return value + "%"
                        },
                        },
                    },
                    xaxis: {
                        labels: {
                        formatter: function (value) {
                            return value  + "%"
                        },
                        },
                        axisTicks: {
                        show: false,
                        },
                        axisBorder: {
                        show: false,
                        },
                    },
                    }
                }

                if (document.getElementById("pie-chart") && typeof ApexCharts !== 'undefined') {
                    const chart = new ApexCharts(document.getElementById("pie-chart"), getChartOptions());
                    chart.render();
                }
            }
        } else {
            alert('Tolong pilih salah satu opsi sebelum melanjutkan.');
        }
    }

    function getCorrectAnswer(questionNumber) {
        const correctAnswers = {
            1: 'D',
            2: 'D',
            3: 'D',
            4: 'D',
            5: 'D',
        };

        return correctAnswers[questionNumber];
    }

    showQuestion(currentQuestion);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    questions.forEach((question) => {
        const optionsContainer = question.querySelector(".flex");

        if (optionsContainer) {
            const options = Array.from(optionsContainer.children);
            shuffleArray(options);

            options.forEach((option) => {
                optionsContainer.appendChild(option);
            });
        }
    });

    nextBtn.addEventListener('click', function(){
        if(welcome == true){
            blockQuestion.style = "opacity:0;transition:all .7s ease";
            clearInterval(intervalPaslon);
            setTimeout(() => {
                nextBtn.innerText = "Selanjutnya";
                nextBtn.classList.remove("mx-auto");
                nextBtn.classList.remove("pulsebtn");
                blockWelcome.classList.add("hidden");
                blockQuestion.style = "transition:all .7s ease";
                questions[0].style.display = 'block';
                welcome = false;
            }, 500);
        } else {
            blockQuestion.style = "opacity:0;transition:all .7s ease";
            setTimeout(() => {
                nextQuestion();
                if (currentQuestion < questions.length) {
                    blockQuestion.style = "transition:all .7s ease";
                }
            }, 500);
        }
    });

});