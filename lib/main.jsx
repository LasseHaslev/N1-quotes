import {
  ComponentRegistry,
} from 'nylas-exports';

import QuoteButton from './QuoteButton';

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
