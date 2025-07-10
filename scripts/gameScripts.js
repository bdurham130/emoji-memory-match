$(document).ready(function () {
  const emojis = ['😀', '🚀', '🍕', '🌈', '🐸', '🎲', '👻', '💎'];
  let cards = [];
  let flipped = [];
  let turns = 0;
  let matchedPairs = 0;
  let totalPairs = emojis.length;

  $('#startBtn').on('click', function () {
    const name = $('#playerName').val();
    if (!name) return alert("Please enter your name.");
    $('#greeting').text(`Hello, ${name}! Let’s play.`);
    startGame();
  });

  $('#resetBtn').on('click', function () {
    startGame();
  });

  function startGame() {
    $('#gameBoard').empty();
    turns = 0;
    matchedPairs = 0;
    flipped = [];
    $('#turns').text(turns);
    $('#endMessage').text(''); // Clear message
    cards = shuffle([...emojis, ...emojis]);

    for (let i = 0; i < cards.length; i++) {
      const card = $(`<div class="card" data-index="${i}">?</div>`);
      $('#gameBoard').append(card);
    }

    $('.card').on('click', function () {
      const index = $(this).data('index');
      if (
        flipped.length < 2 &&
        !$(this).hasClass('matched') &&
        $(this).text() === '?'
      ) {
        $(this).text(cards[index]);
        flipped.push({ index, value: cards[index], element: $(this) });

        if (flipped.length === 2) {
          turns++;
          $('#turns').text(turns);
          if (flipped[0].value === flipped[1].value) {
            flipped[0].element.addClass('matched');
            flipped[1].element.addClass('matched');
            matchedPairs++;
            flipped = [];

            if (matchedPairs === totalPairs) {
              handleWin();
            }
          } else {
            setTimeout(() => {
              flipped[0].element.text('?');
              flipped[1].element.text('?');
              flipped = [];
            }, 800);
          }
        }
      }
    });
  }

  function handleWin() {
    $('#endMessage').text(`🎉 You won in ${turns} turns!`);
    const best = localStorage.getItem('bestScore');
    if (!best || turns < parseInt(best)) {
      localStorage.setItem('bestScore', turns);
      $('#bestScore').text(turns);
      $('#endMessage').append(" 🔥 New high score!");
    } else {
      $('#bestScore').text(best);
    }
  }

  function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
  }

  // Easter Egg
  console.log("🥚 Hint: click the 🐸 emoji for a special background color mode!");

  // Show high score if it exists
  const bestStored = localStorage.getItem('bestScore');
  if (bestStored) {
    $('#bestScore').text(bestStored);
  }
});
