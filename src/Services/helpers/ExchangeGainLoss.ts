export class ExchangeGainLoss {
  static calculateExchangeGainLoss({
    amount,
    new_exchange_rate,
    old_exchange_rate,
  }) {
    // gain is positive, loss is negative
    return amount * (new_exchange_rate - old_exchange_rate);
  }
}
