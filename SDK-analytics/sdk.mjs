export class SDK {
	#events = [];
	#sentEvents = 0;

	constructor() {}

	logEvent(event) {
		this.#events.push(event);
	}

	#logStatusToConsole(eventType = 'send', event) {
		if (eventType === 'send') {
			console.log(`Analytics sent: ${event}`);
		} else {
			console.log('----------------------');
			console.log(`Failed to send: ${event}`);
			console.log(`Retrying sending: ${event}`);
			console.log('----------------------');
		}
	}

	send(eventType = 'send', didFail = false) {
		if (this.#events.length) {
			new Promise((resolve, reject) => {
				setTimeout(() => {
					if (!((this.#sentEvents + 1) % 5) && !didFail) {
						reject(this.#events[0]);
						return;
					}

					this.#sentEvents += 1;
					const event = this.#events.shift();

					this.#logStatusToConsole(eventType, event);
					resolve();

					this.send();
				}, (this.#sentEvents + 1) * 100);
			}).catch((event) => {
				this.#logStatusToConsole('failed', event);
				this.send('send', true);
			});
		}
	}
}
