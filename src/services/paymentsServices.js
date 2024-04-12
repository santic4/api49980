//import Stripe from 'stripe'
//import { STRIPE_KEY_P } from '../config/config.js'
//import { productRepository } from '../repository/productRepository.js'
//
//const CIEN_CENTAVOS_POR_DOLAR = 100
//
//export class PaymentsService {
//  #stripe
//  #productRepository
//  constructor(
//    /** @type {Stripe} */ stripe,
//    productRepository) {
//    this.#stripe = stripe
//    this.#productRepository = productRepository
//  }
//
//  async createPaymentIntent(productId) {
//    const productRequested = await this.#productRepository.getProductId(productId)
//    const paymentIntentInfo = {
//      amount: productRequested.price * CIEN_CENTAVOS_POR_DOLAR,
//      currency: 'usd',
//      metadata: {
//        userId: 'algunUserID',
//        orderDetails: JSON.stringify({ [productRequested.name]: 1 }),
//        address: JSON.stringify({
//          street: 'algunaDireccion',
//          postalCode: 'algunCodigoPostal',
//          externalNumber: '123456'
//        })
//      }
//    }
//    const paymentIntent = await this.#stripe.paymentIntents.create(paymentIntentInfo)
//    return paymentIntent
//  }
//}
//
//const stripe = new Stripe(STRIPE_KEY_P, { apiVersion: '2022-11-15' })
//export const paymentsService = new PaymentsService(stripe, productRepository)