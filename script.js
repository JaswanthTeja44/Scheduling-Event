    const form = document.getElementById('eventForm');
    const eventList = document.getElementById('eventList');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('title').value.trim();
      const date = document.getElementById('date').value;
      const reminder = document.getElementById('reminder').value;
      const notes = document.getElementById('notes').value.trim();

      const titleError = document.getElementById('titleError');
      const dateError = document.getElementById('dateError');

      titleError.textContent = '';
      dateError.textContent = '';

      if (!title) {
        titleError.textContent = 'Title is required.';
        return;
      }

      if (!date) {
        dateError.textContent = 'Please select a valid date and time.';
        return;
      }

      const eventHTML = `
        <div class="event">
          <strong>${title}</strong> <br />
          <small>${new Date(date).toLocaleString()}</small><br />
          <em>${notes}</em><br />
          <small>⏰ Reminder set ${reminder} min before</small>
        </div>
      `;

      eventList.insertAdjacentHTML('beforeend', eventHTML);
      form.reset();

      // Set reminder (browser notification)
      const eventTime = new Date(date).getTime();
      const reminderTime = eventTime - reminder * 60000;
      const currentTime = new Date().getTime();

      if ("Notification" in window && reminderTime > currentTime) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            setTimeout(() => {
              new Notification(`Reminder: ${title}`, {
                body: notes || 'Your event is coming up!',
                icon: 'https://www.svgrepo.com/show/475780/alarm.svg'
              });
            }, reminderTime - currentTime);
          }
        });
      }
    });

