export default function randomViews(state){
    let viewsUser = [];

    while(viewsUser.length < 3){
        let random = Math.floor(Math.random() * state.length)
        if(!viewsUser.includes(state[state.indexOf(state[random])]) ){
            viewsUser.push(state[random])
        }
    }
    return viewsUser
} 