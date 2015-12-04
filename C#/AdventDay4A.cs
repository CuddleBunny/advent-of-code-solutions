using System;
using System.Security.Cryptography;
using System.Text;

public class Program {
	public static void Main() {
		string secretKey = "bgvyzdsv";
		int answer = 0;
		byte[] hash;
		StringBuilder stringBuilder;
		
		while (true) {
			using (MD5 md5Hash = MD5.Create()) {
				hash = md5Hash.ComputeHash(System.Text.Encoding.UTF8.GetBytes(secretKey + answer));
			}

			stringBuilder = new StringBuilder(hash.Length * 2);
			for (int i = 0; i < hash.Length; i++) {
				stringBuilder.Append(hash[i].ToString("x2"));
			}

			if (stringBuilder.ToString().IndexOf("00000") == 0) {
				Console.WriteLine(stringBuilder.ToString());
				break;
			} else
				answer++;
		}

		Console.WriteLine(answer);
		Console.Write("Press any key to continue . . . ");
		Console.ReadKey(true);
	}
}