const selectView = (viewName) => {
    return {
        type: "SELECT_VIEW",
        view: viewName
    }
}   

export { selectView };