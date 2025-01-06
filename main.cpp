#include "include/signature.hpp"
#include <cstdint>
#include <cstring>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>
static_assert(QIS_SIGNATURE_USE_AVX2);
static_assert(QIS_SIGNATURE_USE_TBB);
std::unordered_map<std::string, std::string> IDApattern = {
    {"Player::Player",
     "? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? 91 ? ? ? D1 "
     "? ? ? B9 ? ? ? D5 ? ? ? F9 ? ? ? F9 ? ? ? F9"},
    {"Minecraft::update",
     "? ? ? D1 ? ? ? 6D ? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? A9 ? ? ? A9 "
     "? ? ? 91 ? ? ? D5 ? ? ? F9 F4 03 00 AA ? ? ? F8 ? ? ? 95"},
};
int main() {
  std::vector<std::uint8_t> memory;
  const std::string pathfile = "libminecraftpe.so";
  std::cout << "Scanning " << pathfile << std::endl;
  memory.resize(std::filesystem::file_size(pathfile));
  std::ifstream file(pathfile, std::ios::binary);
  file.read(reinterpret_cast<char *>(memory.data()), memory.size());
  file.close();
  for (auto &pattern : IDApattern) {
    std::cout << "Searching for " << pattern.first << std::endl;
    const qis::signature search(pattern.second);
    const auto pos = qis::scan(memory.data(), memory.size(), search);
    if (pos == qis::npos) {
      std::cout << "Not found" << std::endl;
    } else {
      std::cout << "Found at " << pos << std::endl;
    }
  }
  return 0;
}