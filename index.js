/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require("ask-sdk-core");
const exactResult = require("./scamMatch.json");
const generalDefinition = require("./scamHelper.json");
const types = require("./slotsAndSynonyms.json");
const handlerPrompts = require("./handlerPrompts.json");
const i18n = require("i18next");

const languageStrings = {
  "enUS": {
    translation: {
      handlerPrompts: handlerPrompts.enUS,
      exactResult: exactResult.enUS,
      generalDefinition: generalDefinition.enUS,
    },
  },
  "esUS": {
    translation: {
      handlerPrompts: handlerPrompts.esUS,
      exactResult: exactResult.esUS,
      generalDefinition: generalDefinition.esUS,
    },
  },
};

// This getRefinedSlotType function check if the 'slot' parameter is a synonym and return the appropriate slot.
// If a slot is provided, then the same slot is returned.
const getRefinedSlotType = (slot, lang) => {
  for (let typesI = 0; typesI < types[lang].length; typesI++) {
    const typesValues = types[lang][typesI];

    for (let typesValuesI = 0; typesValuesI < typesValues.values.length; typesValuesI++) {
      const valuesName = typesValues.values[typesValuesI].name;

      if (valuesName.value.toLowerCase() === slot) {
        return `${valuesName.value.toLowerCase()}`;
      } else {
        for (
          let valuesNameSynonymsI = 0;
          valuesNameSynonymsI < valuesName.synonyms.length;
          valuesNameSynonymsI++
        ) {
          const nameSynonym = valuesName.synonyms[valuesNameSynonymsI];

          if (nameSynonym.toLowerCase() === slot) {
            return `${valuesName.value.toLowerCase()}`;
          }
        }
      }
    }
  }

  return "not found";
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest";
  },
  handle(handlerInput) {
    const speakOutput = handlerInput.t("handlerPrompts.LaunchRequestHandler.prompt");
    const speakOutputReprompt = handlerInput.t("handlerPrompts.LaunchRequestHandler.reprompt");

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutputReprompt)
      .getResponse();
  },
};

const ReportScamIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === "ReportScam" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) === "InformeEstafa")
    );
  },
  handle(handlerInput) {
    console.log("REPORT  <>");
    const exact = getRefinedSlotType(
      handlerInput.requestEnvelope.request.intent.slots.exact.value.toString().toLowerCase(),
      Alexa.getLocale(handlerInput.requestEnvelope).replace(/-/g, "")
    );

    if (exact !== null) {
      const key = `${exact}`;

      const speakOutput = handlerInput.t(`exactResult.${key}.result`);
      const speakOutputReprompt = handlerInput.t("handlerPrompts.ReportScamIntentHandler.reprompt");

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutputReprompt)
        .getResponse();
    }
  },
};

const ExactDefinitionIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === "ExactDefinition" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) === "ExactDefinicion")
    );
  },
  handle(handlerInput) {
    const exact = getRefinedSlotType(
      handlerInput.requestEnvelope.request.intent.slots.exact.value.toString().toLowerCase(),
      Alexa.getLocale(handlerInput.requestEnvelope).replace(/-/g, "")
    );

    if (exact !== null) {
      const key = `${exact}`;

      const speakOutput = handlerInput.t(`exactResult.${key}.description`);
      const speakOutputReprompt = handlerInput.t(
        "handlerPrompts.ExactDefinitionIntentHandler.reprompt"
      );

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutputReprompt)
        .getResponse();
    }
  },
};

const FinancialDefinitionIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === "FinancialDefinition" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) === "DefinicionFinanciera")
    );
  },
  handle(handlerInput) {
    if (handlerInput.requestEnvelope.request.intent.slots["financial"] !== undefined) {
      const financial = getRefinedSlotType(
        handlerInput.requestEnvelope.request.intent.slots.financial.value.toString().toLowerCase(),
        Alexa.getLocale(handlerInput.requestEnvelope).replace(/-/g, "")
      );
      
      console.log("slot after mod:" + financial);
      
      const key = `${financial}`;

      const speakOutput = handlerInput.t(`generalDefinition.${key}.description`);
      const speakOutputReprompt = handlerInput.t(
        "handlerPrompts.FraudDefinitionIntentHandler.reprompt"
      );

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutputReprompt)
        .getResponse();
    } else if (handlerInput.requestEnvelope.request.intent.slots["financiera"] !== undefined) {
      const financiera = getRefinedSlotType(
        handlerInput.requestEnvelope.request.intent.slots.financiera.value.toString().toLowerCase(),
        Alexa.getLocale(handlerInput.requestEnvelope).replace(/-/g, "")
      );
    
      console.log("slot after mod:" + financiera);
      
      const key = `${financiera}`;

      const speakOutput = handlerInput.t(`generalDefinition.${key}.description`);
      const speakOutputReprompt = handlerInput.t(
        "handlerPrompts.FraudDefinitionIntentHandler.reprompt"
      );

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutputReprompt)
        .getResponse();
    }
  },
};

const ImposterDefinitionIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === "ImposterDefinition" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) === "DefinicionImpostor")
    );
  },
  handle(handlerInput) {
    if (handlerInput.requestEnvelope.request.intent.slots["imposter"] !== undefined) {
      const imposter = getRefinedSlotType(
        handlerInput.requestEnvelope.request.intent.slots.imposter.value.toString().toLowerCase(),
        Alexa.getLocale(handlerInput.requestEnvelope).replace(/-/g, "")
      );
      
      console.log("slot after mod:" + imposter);
      
      const key = `${imposter}`;

      const speakOutput = handlerInput.t(`generalDefinition.${key}.description`);
      const speakOutputReprompt = handlerInput.t(
        "handlerPrompts.FraudDefinitionIntentHandler.reprompt"
      );

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutputReprompt)
        .getResponse();
    } else if (handlerInput.requestEnvelope.request.intent.slots["impostor"] !== undefined) {
      const impostor = getRefinedSlotType(
        handlerInput.requestEnvelope.request.intent.slots.impostor.value.toString().toLowerCase(),
        Alexa.getLocale(handlerInput.requestEnvelope).replace(/-/g, "")
      );
    
      console.log("slot after mod:" + impostor);
      
      const key = `${impostor}`;

      const speakOutput = handlerInput.t(`generalDefinition.${key}.description`);
      const speakOutputReprompt = handlerInput.t(
        "handlerPrompts.FraudDefinitionIntentHandler.reprompt"
      );

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutputReprompt)
        .getResponse();
    }
  },
};

const FraudDefinitionIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === "IdentityTheftDefinition" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) === "DefinicionRoboDeIdentidad")
    );
  },
  handle(handlerInput) {
    if (handlerInput.requestEnvelope.request.intent.slots["fraud"] !== undefined) {
      const fraud = getRefinedSlotType(
        handlerInput.requestEnvelope.request.intent.slots.fraud.value.toString().toLowerCase(),
        Alexa.getLocale(handlerInput.requestEnvelope).replace(/-/g, "")
      );
      
      console.log("slot after mod:" + fraud);
      
      const key = `${fraud}`;

      const speakOutput = handlerInput.t(`generalDefinition.${key}.description`);
      const speakOutputReprompt = handlerInput.t(
        "handlerPrompts.FraudDefinitionIntentHandler.reprompt"
      );

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutputReprompt)
        .getResponse();
    } else if (handlerInput.requestEnvelope.request.intent.slots["fraude"] !== undefined) {
      const fraude = getRefinedSlotType(
        handlerInput.requestEnvelope.request.intent.slots.fraude.value.toString().toLowerCase(),
        Alexa.getLocale(handlerInput.requestEnvelope).replace(/-/g, "")
      );
    
      console.log("slot after mod:" + fraude);
      
      const key = `${fraude}`;

      const speakOutput = handlerInput.t(`generalDefinition.${key}.description`);
      const speakOutputReprompt = handlerInput.t(
        "handlerPrompts.FraudDefinitionIntentHandler.reprompt"
      );

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutputReprompt)
        .getResponse();
    }
  },
};

const MovingDefinitionIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === "MovingDefinition" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) === "DefinicionMudanza")
    );
  },
  handle(handlerInput) {
    if (handlerInput.requestEnvelope.request.intent.slots["moving"] !== undefined) {
      const moving = getRefinedSlotType(
        handlerInput.requestEnvelope.request.intent.slots.financial.value.toString().toLowerCase(),
        Alexa.getLocale(handlerInput.requestEnvelope).replace(/-/g, "")
      );
      
      console.log("slot after mod:" + moving);
      
      const key = `${moving}`;

      const speakOutput = handlerInput.t(`generalDefinition.${key}.description`);
      const speakOutputReprompt = handlerInput.t(
        "handlerPrompts.FraudDefinitionIntentHandler.reprompt"
      );

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutputReprompt)
        .getResponse();
    } else if (handlerInput.requestEnvelope.request.intent.slots["mudanza"] !== undefined) {
      const mudanza = getRefinedSlotType(
        handlerInput.requestEnvelope.request.intent.slots.mudanza.value.toString().toLowerCase(),
        Alexa.getLocale(handlerInput.requestEnvelope).replace(/-/g, "")
      );
    
      console.log("slot after mod:" + mudanza);
      
      const key = `${mudanza}`;

      const speakOutput = handlerInput.t(`generalDefinition.${key}.description`);
      const speakOutputReprompt = handlerInput.t(
        "handlerPrompts.FraudDefinitionIntentHandler.reprompt"
      );

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutputReprompt)
        .getResponse();
    }
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = handlerInput.t("handlerPrompts.HelpIntentHandler.prompt");

    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.CancelIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speakOutput = handlerInput.t("handlerPrompts.CancelAndStopIntentHandler.prompt");

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};

/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet
 * */
const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.FallbackIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = handlerInput.t("handlerPrompts.FallbackIntentHandler.prompt");

    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  },
};

/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs
 * */
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "SessionEndedRequest";
  },
  handle(handlerInput) {
    console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
  },
};

/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents
 * by defining them above, then also adding them to the request handler chain below
 * */
const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest";
  },
  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `You just triggered ${intentName}`;

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 * */
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speakOutput = "Sorry, I had trouble doing what you asked. Please try again.";
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
  },
};

// This request interceptor will bind a translation function 't' to the handlerInput
const LocalisationRequestIntercepter = {
  process(handlerInput) {
    i18n
      .init({
        lng: Alexa.getLocale(handlerInput.requestEnvelope).replace(/-/g, ""),
        resources: languageStrings,
      })
      .then((t) => {
        handlerInput.t = (...args) => t(...args);
      });
  },
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 * */
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    ReportScamIntentHandler,
    ExactDefinitionIntentHandler,
    MovingDefinitionIntentHandler,
    FraudDefinitionIntentHandler,
    ImposterDefinitionIntentHandler,
    FinancialDefinitionIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler
  )
  .addRequestInterceptors(LocalisationRequestIntercepter)
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent("sample/hello-world/v1.2")
  .lambda();
