const eventNames = ['API:UN_AUTH', 'API:UNVALIDATE', 'API:BAD_REQUEST', 'API:FORBIDDEN',
    'API:NOT_FOUND', 'API:METHOD_NOT_ALLOWED', 'API:UNPROCESSABLE_ENTITY', 'API:NO_RESPONSE', 'API:UNKNOWN_ERROR'] as const

type EventNames = (typeof eventNames)[number]

class EventEmitter {
    private listeners: Record<EventNames, Set<Function>> = {
        'API:UN_AUTH': new Set(),
        'API:UNVALIDATE': new Set(),
        'API:BAD_REQUEST': new Set(),
        'API:FORBIDDEN': new Set(),
        'API:NOT_FOUND': new Set(),
        'API:METHOD_NOT_ALLOWED': new Set(),
        'API:UNPROCESSABLE_ENTITY': new Set()
    }

    on(eventName: EventNames, listener: Function) {
        this.listeners[eventName].add(listener)
    }

    emit(eventName: EventNames, ...args: any[]) {
        this.listeners[eventName].forEach(listener => listener(...args))
    }
}

export default new EventEmitter()