from dataclasses import dataclass

@dataclass
class Env:
    dev: str = "dev"
    prod: str = "prod"
    test: str = "test"

    def is_dev(self) -> bool:
        return self == self.dev
    