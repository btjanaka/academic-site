"""Adds a quote drawing from the external art repo to the Personal page.

Usage (from root dir of this repo):
  python tools/add_quote_drawing.py [quote-drawing-name] [caption]

Here is an example where the [quote-drawing-name] is foobar. In the art repo,
this indicates that the source is stored in quotes/foobar.svg, and the png is
stored in build/quotes/foobar.png. The command is:
  python tools/add_quote_drawing.py foobar "This is a great quote"
"""

import os
import sys

from ruamel import yaml  # Run `pip install ruamel.yaml` to install.


def header_print(msg):
    """Print a message as a header."""
    print(f"========== {msg} ==========")


def main():
    """Carries out all necessary tasks."""
    if len(sys.argv) != 3:
        print("Usage: python tools/add_quote_drawing.py [quote-drawing-name] "
              "[caption]")
        sys.exit(1)

    quote_name = sys.argv[1]
    caption = sys.argv[2]

    header_print("Updating external/art submodule")
    os.system("(cd external/art && git pull origin master)")

    header_print("Adding a symlink to the img in src/assets/img/graphic-design")
    os.system(f"cd src/assets/img/graphic-design/ && "
              f"ln -s ../../../../external/art/build/quotes/{quote_name}.png")

    datapath = "src/_data/personal.yml"
    header_print(f"Adding the quote to {datapath}")
    with open(datapath, "r") as datafile:
        data = yaml.load(datafile, Loader=yaml.RoundTripLoader)
    data["graphic_design"][1]["items"].append({
        "img": f"/assets/img/graphic-design/{quote_name}.png",
        "caption": caption,
        "vertical": True,
    })
    with open(datapath, "w") as datafile:
        yaml.dump(data, datafile, Dumper=yaml.RoundTripDumper)
    os.system(f"prettier --config ./.prettierrc --write {datapath}")

    header_print("Creating a commit")
    os.system(f"git add {datapath} "
              f"src/assets/img/graphic-design/{quote_name}.png "
              f"external/art")
    os.system(f'git commit -m "Add {quote_name} quote drawing"')


if __name__ == "__main__":
    main()
