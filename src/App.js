import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import deepEqual from "deep-equal";

class App extends Component {
  render() {
    const { page, data: { loading, people, _peopleCount }, limitPerPage, dataToMatch } = this.props;
    const totalPages = _peopleCount && _peopleCount/limitPerPage;
    const formattedPeople = people ? people.map((person) => ({ id: +person.id, name: person.name })) : undefined;
    return (
      <main>
        <header>
          <h1>Simple pagination React app using <code>react-apollo</code> with <code>'cache-and-network'</code> fetch policy</h1>
          <h2>Annotation:</h2>
          <p>
            This app either shows list of people, either a query's cached value while it's loading.
          </p>
          <p>
            The bug is that if you switch to a page which should show the query results with different variables,
            but it hasn't been cached once, it actually show cached value from a "previous" (query-variables) pair.
          </p>
          <p>
            And it better show the actual value of cache to that pair instead, which is <code>undefined</code>.
          </p>
        </header>
        <h2>Content:</h2>
        {loading ? (
          <div>
            <div>Loading…</div>
            <div>Meanwhile, <code>people</code> should equal either <code>undefined</code>, or <code>{JSON.stringify(dataToMatch)}</code></div>
            <div>Actual value is <code>{JSON.stringify(formattedPeople) || 'undefined'}</code></div>
            <div>Matching? { deepEqual(formattedPeople, undefined) || deepEqual(formattedPeople, dataToMatch) ? <code className='match'>YES</code> : <code className='mismatch'>NO</code> }</div>
          </div>
        ) : (
          <div>
            <ul>
              {people.map(person => <li key={person.id}>{person.name}</li>)}
            </ul>
            <button disabled={page <= 1} onClick={() => this.props.setPage(page - 1)}>Previous</button>
            { ` Page ${page} ` }
            <button disabled={page > totalPages} onClick={() => this.props.setPage(page + 1)}>Next</button>
          </div>
        )}
      </main>
    );
  }
}

export default graphql(
  gql`
    query ErrorTemplate($first: Int, $skip: Int) {
      people(first: $first, skip: $skip) {
        id
        name
      }
      _peopleCount
    }
  `,
  {
    options: (ownProps) => {
      return {
        variables: { first: ownProps.limitPerPage, skip: (ownProps.page - 1)*ownProps.limitPerPage },
        fetchPolicy: 'cache-and-network'
      }
    }
  }
)(App);
