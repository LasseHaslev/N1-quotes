import {
  ComponentRegistry,
} from 'nylas-exports';

import QuoteButton from './quote-button';

export function activate() {
  ComponentRegistry.register(QuoteButton, {
    role: 'Composer:ActionButton',
  });
}

export function serialize() {

}

export function deactivate() {
  ComponentRegistry.unregister(QuoteButton);
}
