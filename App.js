import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

class Banner extends React.Component {
  render() {
    return (
      <View style={styles.heading}>
        <Text style={styles.headingText}>Tic Tac Toe</Text>
      </View>
    );
  }
}

class Square extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
        <Text style={styles.tile}>{this.props.value}</Text>
      </TouchableWithoutFeedback>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? (
      <Icon name="close" style={styles.tileX} />
    ) : (
      <Icon name="circle-outline" style={styles.tileO} />
    );
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onPress={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next Player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <View>
        <Text style={styles.text}>{status}</Text>
        <View style={{ flexDirection: "row" }}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </View>

        <View style={{ flexDirection: "row" }}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </View>

        <View style={{ flexDirection: "row" }}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </View>
      </View>
    );
  }
}

//===================================================

export default function App() {
  return (
    <View style={styles.container}>
      <Banner />
      <Board />
    </View>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff3cd",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    justifyContent: "center",
    marginBottom: 20,
  },
  headingText: {
    color: "#7c3c21",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 30,
  },
  board: {
    borderWidth: 1,
    height: 312,
    width: 312,
  },
  tile: {
    borderWidth: 2,
    width: 100,
    height: 100,
    backgroundColor: "#ffecc7",
    borderColor: "#f5b971",
  },
  tileX: {
    color: "red",
    fontSize: 60,
  },
  tileO: {
    color: "green",
    fontSize: 60,
  },
  text: {
    color: "#7c3c21",
    fontSize: 15,
  },
});

/* <View style={styles.tile}>
            // <Icon name="close" style={styles.tileX} />
          </View>
          <View style={styles.tile}><Icon name="circle-outline" style={styles.tileO} /></View>
          <View style={styles.tile} /> */
