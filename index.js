
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';
const TOGGLE_GOAL = 'TOGGLE_GOAL';

function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo
    }
}
function removeTodoAction(id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

function toggleTodoAction(id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}

function addTodoAction(goal) {
    return {
        type: ADD_GOAL,
        todo
    }
}
function removeTodoAction(id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}

function toggleTodoAction(id) {
    return {
        type: TOGGLE_GOAL,
        id
    }
}

function createStore(reducer) {

    let state;

    const getState = () => state

    let listeners = []

    const subscribe = listener => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    }

    const dispatch = action => {
        state = reducer(state, action);
        listeners.forEach(listener => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }

}


const store = createStore(app);

const unsubscribe = store.subscribe(() => {
    console.log("the new state is: ", store.getState())
})

function app(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }

}


function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo]);
        case REMOVE_TODO:
            return state.filter(a => a.id === action.id);
        case TOGGLE_TODO:
            return state.map(todo => todo.id !== action.id ? todo : Object.assign({}, todo, { complete: !todo.complete }))
        default:
            return state
    }
}



function goals(state = [], action) {
    switch (action.type) {
        case ADD_GOAL:
            return state.concat([action.goal]);
        case REMOVE_GOAL:
            return state.filter(goal => goal.id === action.id);
        case TOGGLE_GOAL:
            return state.map(goal => goal.id !== action.id ? goal : Object.assign({}, goal, { complete: !goal.complete }))
        default:
            return state
    }
}

store.dispatch({
    type: ADD_TODO,
    todo: {
        id: 0,
        name: "Learn redux",
        complete: false
    }
})



