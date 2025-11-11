(function ($) {
  'use strict';

  function getTimeBasedGreeting(date = new Date()) {
    const hour = date.getHours();

    if (hour < 12) {
      return 'Selamat pagi, kreator web!';
    }

    if (hour < 18) {
      return 'Selamat siang, terus berkarya!';
    }

    return 'Selamat malam, waktunya bereksperimen!';
  }

  function updateLearningTips(tips) {
    const $list = $('#learningTips');
    $list.empty();

    tips.forEach((tip) => {
      const $item = $('<li />', {
        class: 'list-group-item d-flex align-items-start gap-2 flex-column flex-md-row',
      });

      $('<span />', {
        class: 'badge bg-primary-subtle text-primary-emphasis rounded-pill px-3 py-2',
        text: 'Tips',
      }).appendTo($item);

      $('<span />', { text: tip }).appendTo($item);
      $item.appendTo($list);
    });
  }

  function toggleTheme() {
    $('body').toggleClass('theme-dark');
    const isDark = $('body').hasClass('theme-dark');
    $('#themeToggle').text(isDark ? 'Mode Terang' : 'Mode Gelap');
  }

  $(function () {
    $('#greeting').text(getTimeBasedGreeting());

    updateLearningTips([
      'Mulai dari membuat struktur HTML yang semantik agar mudah dirawat.',
      'Gunakan komponen siap pakai dari Bootstrap untuk mempercepat pengembangan.',
      'Pisahkan logika JavaScript ke dalam fungsi-fungsi kecil yang mudah diuji.',
    ]);

    $('#themeToggle').on('click', toggleTheme);

    $('#newsletterForm').on('submit', function (event) {
      event.preventDefault();
      const name = $('#nameInput').val().trim();

      if (!name) {
        alert('Nama tidak boleh kosong ya!');
        return;
      }

      const message = `Terima kasih, ${name}! Kami akan mengirimkan materi terbaru setiap minggunya.`;
      const $feedback = $('#formFeedback');
      $feedback.removeClass('d-none').hide().text(message).fadeIn(300);
      this.reset();
    });
  });

  window.getTimeBasedGreeting = getTimeBasedGreeting;
  window.updateLearningTips = updateLearningTips;
  window.toggleTheme = toggleTheme;
})(jQuery);
